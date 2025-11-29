# Contributing to StellarGo

Thank you for your interest in contributing to StellarGo! This document provides guidelines and instructions for contributing.

## 🎯 Project Goals

StellarGo aims to create an intuitive, secure, and fun location-based cryptocurrency platform on the Stellar Network. Our focus is on:

- **User Experience**: Clean, professional FinTech design
- **Performance**: Fast transactions and responsive UI
- **Security**: Safe handling of crypto assets
- **Innovation**: Novel use cases for blockchain

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/stellargo.git
cd stellargo

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/stellargo.git
```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB
brew services start mongodb-community

# Seed database
npm run seed

# Run development server
npm run dev
```

### 3. Create a Branch

```bash
# Update main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b fix/bug-description
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict mode

```typescript
// Good
interface DropData {
  amount: number;
  message: string;
}

// Avoid
const data: any = { amount: 10 };
```

### React Components

- Use functional components with hooks
- Proper prop typing with TypeScript
- Follow component structure:

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  // Component logic
  return <div>{title}</div>;
};

export default MyComponent;
```

### Styling

- Use Tailwind CSS utility classes
- Follow the design system colors:
  - Primary: Blue (`primary-*`)
  - Accent: Gray (`accent-*`)
  - Semantic: Success/Error/Warning
- Mobile-first responsive design

```typescript
// Good
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  Click Me
</button>

// Avoid inline styles
<button style={{ backgroundColor: 'blue' }}>Click Me</button>
```

### File Organization

```
src/
├── app/              # Pages (Next.js App Router)
├── components/       # Reusable components
├── lib/              # Utilities and helpers
├── models/           # Database models
└── types/            # TypeScript types
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `DropModal.tsx`)
- **Utilities**: camelCase (`calculateDistance.ts`)
- **Types**: PascalCase (`Drop`, `UserLocation`)
- **Constants**: UPPER_SNAKE_CASE (`ISTANBUL_CENTER`)
- **Functions**: camelCase (`createDrop`, `handleSubmit`)

## 🧪 Testing

### Writing Tests

```typescript
// Example test structure
describe('DropModal', () => {
  it('should validate amount correctly', () => {
    // Test implementation
  });

  it('should handle form submission', () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test DropModal
```

## 📦 Commits

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting)
refactor: Code refactoring
test:     Test additions/changes
chore:    Build process or auxiliary tool changes

# Examples
feat(map): add zoom controls to map view
fix(wallet): resolve connection timeout issue
docs(readme): update installation instructions
style(button): improve hover state styling
refactor(api): simplify drop creation logic
test(drops): add unit tests for drop model
chore(deps): update dependencies
```

### Good Commit Practices

✅ **Do:**
- Make small, focused commits
- Write clear, descriptive messages
- Reference issues when applicable
- Test before committing

❌ **Don't:**
- Commit incomplete features
- Mix multiple changes in one commit
- Use vague messages ("fix stuff", "update")
- Commit secrets or credentials

## 🔀 Pull Requests

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] No linter errors
- [ ] Documentation updated (if needed)
- [ ] Self-review completed
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
```

### Review Process

1. Submit PR with clear description
2. Address review comments
3. Keep PR updated with main branch
4. Squash commits if requested
5. Wait for approval from maintainers

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Safari, Firefox]
- Version: [e.g., 22]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other context, mockups, or screenshots.
```

## 🎨 Design Guidelines

### UI/UX Principles

1. **Clean & Professional**: Inspired by Stripe/Revolut
2. **Mobile-First**: Design for mobile, enhance for desktop
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Performance**: Fast, smooth interactions
5. **Consistency**: Use design system components

### Color Palette

```css
/* Primary (Blue) */
--primary-600: #0284c7;
--primary-700: #0369a1;

/* Accent (Gray) */
--accent-100: #f4f4f5;
--accent-600: #52525b;
--accent-900: #18181b;

/* Semantic */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
```

## 🔐 Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Email security concerns to: security@stellargo.example

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Best Practices

- Never commit secrets or API keys
- Validate all user input
- Sanitize database queries
- Use HTTPS in production
- Keep dependencies updated
- Review code for vulnerabilities

## 📄 Documentation

### Documentation Standards

- Clear and concise
- Include code examples
- Update with code changes
- Use proper markdown formatting

### Where to Document

- **README.md**: Project overview, quick start
- **SETUP.md**: Detailed setup instructions
- **DEPLOYMENT.md**: Deployment guide
- **Code comments**: Complex logic explanation
- **API docs**: Endpoint specifications

## 🌟 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in project documentation

## 📞 Community

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and ideas
- **Discord**: Real-time chat (if available)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to StellarGo! 🚀

