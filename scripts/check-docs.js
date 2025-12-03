#!/usr/bin/env node

/**
 * Documentation verification script for Fabric Design System components.
 * 
 * This script checks that all components (atoms, molecules, organisms) have:
 * - A README.md file
 * - Required documentation sections (Props, Events, Slots, Examples)
 * 
 * Usage: node scripts/check-docs.js
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const COMPONENTS_ROOT = join(__dirname, '..', 'src', 'components');
const CATEGORIES = ['atoms', 'molecules', 'organisms'];

// Required sections for component documentation (French titles)
const REQUIRED_SECTIONS = {
  props: ['## Props', '## props'],
  events: ['## Événements', '## Evenements', '## événements', '## evenements', '## Events', '## events'],
  examples: ['## Exemple', '## exemple', '## Examples', '## examples', '## Usage', '## usage']
};

// Optional sections (validated if component uses them)
const OPTIONAL_SECTIONS = {
  slots: ['## Slots', '## slots']
};

// ANSI color codes
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

/**
 * Gets all component directories from a category folder.
 * Only returns directories that start with 'F' (component convention).
 */
function getComponentDirs(categoryPath) {
  if (!existsSync(categoryPath)) {
    return [];
  }
  
  return readdirSync(categoryPath)
    .filter(item => {
      const itemPath = join(categoryPath, item);
      return statSync(itemPath).isDirectory() && item.startsWith('F');
    });
}

/**
 * Checks if a file content contains at least one of the section patterns.
 */
function hasSection(content, patterns) {
  return patterns.some(pattern => content.includes(pattern));
}

/**
 * Checks if the README contains code examples (code blocks with vue/html).
 */
function hasCodeExamples(content) {
  const codeBlockPattern = /```vue|```html|```javascript/i;
  return codeBlockPattern.test(content);
}

/**
 * Analyzes the component's .vue file to detect if it has events or slots.
 */
function analyzeVueFile(vuePath) {
  if (!existsSync(vuePath)) {
    return { hasEmits: false, hasSlots: false };
  }
  
  const content = readFileSync(vuePath, 'utf-8');
  
  // Check for $emit calls (Vue 2 patterns: this.$emit, $emit)
  const hasEmits = /(\$emit\s*\(|this\.\$emit\s*\()/.test(content);
  
  // Check for slot usage (matches <slot>, <slot/>, <slot:name>, etc.)
  const hasSlots = /<slot(\s|\/|>)/.test(content);
  
  return { hasEmits, hasSlots };
}

/**
 * Validates a single component's documentation.
 */
function validateComponent(componentPath, componentName) {
  const readmePath = join(componentPath, 'README.md');
  const vuePath = join(componentPath, `${componentName}.vue`);
  
  const issues = [];
  const warnings = [];
  
  // Check if README exists
  if (!existsSync(readmePath)) {
    issues.push('Missing README.md file');
    return { valid: false, issues, warnings };
  }
  
  const content = readFileSync(readmePath, 'utf-8');
  const { hasEmits, hasSlots } = analyzeVueFile(vuePath);
  
  // Check required sections
  if (!hasSection(content, REQUIRED_SECTIONS.props)) {
    issues.push('Missing Props section');
  }
  
  // Check for events section only if component emits events
  if (hasEmits && !hasSection(content, REQUIRED_SECTIONS.events)) {
    issues.push('Missing Événements/Events section (component uses $emit)');
  }
  
  // Check for slots section only if component uses slots
  if (hasSlots && !hasSection(content, OPTIONAL_SECTIONS.slots)) {
    issues.push('Missing Slots section (component uses slots)');
  }
  
  // Check for usage examples
  if (!hasSection(content, REQUIRED_SECTIONS.examples)) {
    issues.push('Missing Usage Examples section');
  } else if (!hasCodeExamples(content)) {
    issues.push('No code examples found in Examples section');
  }
  
  return {
    valid: issues.length === 0,
    issues,
    warnings
  };
}

/**
 * Runs the documentation verification.
 */
function checkDocumentation() {
  console.log(`${COLORS.bold}${COLORS.blue}╔════════════════════════════════════════════════════════════════╗${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.blue}║     Fabric Design System - Documentation Verification         ║${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.blue}╚════════════════════════════════════════════════════════════════╝${COLORS.reset}\n`);
  
  let totalComponents = 0;
  let validComponents = 0;
  let invalidComponents = 0;
  
  for (const category of CATEGORIES) {
    const categoryPath = join(COMPONENTS_ROOT, category);
    const components = getComponentDirs(categoryPath);
    
    if (components.length === 0) {
      continue;
    }
    
    console.log(`${COLORS.bold}${COLORS.cyan}📁 ${category.charAt(0).toUpperCase() + category.slice(1)}${COLORS.reset}`);
    console.log(`${'─'.repeat(50)}`);
    
    for (const component of components) {
      totalComponents++;
      const componentPath = join(categoryPath, component);
      const result = validateComponent(componentPath, component);
      
      if (result.valid) {
        validComponents++;
        console.log(`  ${COLORS.green}✓${COLORS.reset} ${component}`);
      } else {
        invalidComponents++;
        console.log(`  ${COLORS.red}✗${COLORS.reset} ${component}`);
        
        for (const issue of result.issues) {
          console.log(`    ${COLORS.red}└─ ${issue}${COLORS.reset}`);
        }
      }
      
      // Show warnings (non-blocking)
      for (const warning of result.warnings) {
        console.log(`    ${COLORS.yellow}└─ ⚠ ${warning}${COLORS.reset}`);
      }
    }
    
    console.log('');
  }
  
  // Summary
  console.log(`${COLORS.bold}═══════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.bold}📊 Summary${COLORS.reset}`);
  console.log(`${COLORS.bold}═══════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`   Total components: ${totalComponents}`);
  console.log(`   ${COLORS.green}✓ Complete documentation: ${validComponents}${COLORS.reset}`);
  console.log(`   ${COLORS.red}✗ Missing documentation: ${invalidComponents}${COLORS.reset}`);
  
  const percentage = totalComponents > 0 
    ? Math.round((validComponents / totalComponents) * 100) 
    : 0;
  
  console.log(`   Coverage: ${percentage}%`);
  console.log('');
  
  // Exit with error if there are issues
  if (invalidComponents > 0) {
    console.log(`${COLORS.yellow}⚠ Some components have incomplete documentation.${COLORS.reset}`);
    console.log(`${COLORS.yellow}  Please ensure each component has:${COLORS.reset}`);
    console.log(`${COLORS.yellow}  - A README.md file${COLORS.reset}`);
    console.log(`${COLORS.yellow}  - Props section${COLORS.reset}`);
    console.log(`${COLORS.yellow}  - Événements section (if component emits events)${COLORS.reset}`);
    console.log(`${COLORS.yellow}  - Slots section (if component uses slots)${COLORS.reset}`);
    console.log(`${COLORS.yellow}  - Usage examples with code blocks${COLORS.reset}`);
    process.exit(1);
  } else {
    console.log(`${COLORS.green}✓ All components have complete documentation!${COLORS.reset}`);
    process.exit(0);
  }
}

// Run the verification
checkDocumentation();
