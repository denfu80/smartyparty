# UI Style Guide

## Overview

This style guide documents the design system and component usage for Sternenhaus. We use shadcn/ui components built on Radix UI primitives, styled with Tailwind CSS.

## Color Scheme

### Theme Colors

The application supports a light/dark theme system using CSS custom properties:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

### Semantic Colors

- **Success:** Green tones for positive actions, completed states
- **Warning:** Yellow/Orange for caution, pending states
- **Error:** Red tones for errors, destructive actions
- **Info:** Blue tones for informational content

## Typography

### Font Family

- Primary: System font stack (native to platform)
- Code: Monospace font stack

### Font Sizes

| Size | Tailwind Class | Use Case |
|------|----------------|----------|
| xs | `text-xs` | Helper text, badges |
| sm | `text-sm` | Secondary text, descriptions |
| base | `text-base` | Body text |
| lg | `text-lg` | Section headers |
| xl | `text-xl` | Card titles |
| 2xl | `text-2xl` | Page titles |

### Font Weights

- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

## Spacing

Use Tailwind's spacing scale (4px base unit):

- **Tight spacing:** `gap-1` (4px), `gap-2` (8px)
- **Normal spacing:** `gap-3` (12px), `gap-4` (16px)
- **Loose spacing:** `gap-6` (24px), `gap-8` (32px)

## Component Guidelines

### Cards

Use `Card` components for contained content blocks:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Actions go here
  </CardFooter>
</Card>
```

**Best Practices:**
- Always include a title
- Use description for context
- Footer for actions only
- Avoid nesting cards deeply

### Buttons

Button variants and their use cases:

- `default`: Primary actions
- `secondary`: Secondary actions
- `outline`: Tertiary actions, cancel
- `ghost`: Subtle actions, navigation
- `destructive`: Delete, remove actions

```tsx
<Button variant="default">Primary Action</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
```

### Badges

Use badges to highlight status or counts:

```tsx
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="outline">Archived</Badge>
```

**Color Guidelines:**
- Green badges: Completed, active, success
- Yellow badges: Pending, warning
- Red badges: Failed, error
- Gray badges: Neutral, count

### Icons

We use `lucide-react` for icons:

```tsx
import { Rocket, User, Settings } from 'lucide-react';

<Rocket className="h-4 w-4" />
<User className="h-5 w-5" />
```

**Size Guidelines:**
- Small: `h-4 w-4` (16px) - Inline with text
- Medium: `h-5 w-5` (20px) - Buttons, cards
- Large: `h-6 w-6` (24px) - Headers, emphasis

## Layout Patterns

### Responsive Grid

Use responsive grid for lists of items:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</div>
```

### Page Layout

Use layout components for consistent page structure:

```tsx
// For game screens
<GameLayout gameId={gameId} playerStats={stats}>
  <YourContent />
</GameLayout>

// For dashboard/lobby
<DashboardLayout>
  <YourContent />
</DashboardLayout>
```

### Container Widths

- **Full width:** No container, use for sidebars
- **Contained:** `container` class for main content
- **Narrow:** `max-w-4xl mx-auto` for forms, reading

## Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```tsx
// Mobile: Stack, Desktop: Side-by-side
<div className="flex flex-col md:flex-row gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

## Accessibility

### ARIA Labels

Always provide meaningful labels:

```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:
- Use semantic HTML (`<button>`, `<a>`)
- Ensure proper focus indicators
- Support Tab navigation

### Color Contrast

Maintain WCAG AA contrast ratios:
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

## Component Composition

### Example: Resource Display

```tsx
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Package className="h-5 w-5" />
      Resources
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <span className="text-sm font-medium">Fuel</span>
        <Badge variant="secondary">1,500</Badge>
      </div>
    </div>
  </CardContent>
</Card>
```

### Example: Status Display

```tsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-green-500" />
  <span className="text-sm">Online</span>
</div>
```

## Common Patterns

### Loading State

```tsx
{loading ? (
  <Loader2 className="h-6 w-6 animate-spin" />
) : (
  <Content />
)}
```

### Empty State

```tsx
<Card>
  <CardContent className="py-8 text-center">
    <p className="text-sm text-muted-foreground">
      No items found
    </p>
  </CardContent>
</Card>
```

### Error State

```tsx
<div className="p-4 bg-destructive/10 text-destructive rounded-lg">
  <p className="text-sm">{error.message}</p>
</div>
```

## Best Practices

1. **Consistency:** Use the same patterns across the app
2. **Simplicity:** Don't over-design, focus on usability
3. **Performance:** Avoid unnecessary re-renders
4. **Accessibility:** Always consider keyboard and screen reader users
5. **Responsive:** Test on mobile, tablet, and desktop
6. **Dark Mode Ready:** Use theme variables, not hard-coded colors

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Lucide Icons](https://lucide.dev/)
