# 🎨 Instagram Caption Generator - Color Palette & Design Guide

## 🌈 Color Palette

### Primary Colors

#### Background & Surface
```css
--background: 0 0% 100%           /* Pure white #FFFFFF */
--card: 0 0% 100%                 /* Pure white #FFFFFF */
--popover: 0 0% 100%              /* Pure white #FFFFFF */
```

#### Text Colors
```css
--foreground: 340 10% 10%         /* Near black #1a1618 */
--card-foreground: 340 10% 10%    /* Near black #1a1618 */
--muted-foreground: 340 10% 45%   /* Medium gray #6b5f66 */
```

#### Accent Colors
```css
--primary: 330 80% 55%            /* Vibrant pink #e6167d */
--primary-foreground: 0 0% 100%   /* White #FFFFFF */
--secondary: 320 20% 96%          /* Light pink #f8f4f7 */
--secondary-foreground: 340 10% 10% /* Near black #1a1618 */
```

#### Interactive Elements
```css
--border: 320 15% 90%             /* Soft pink border #ebe5e9 */
--input: 320 15% 90%              /* Soft pink border #ebe5e9 */
--ring: 330 80% 55%               /* Focus ring pink #e6167d */
```

### Gradient Classes

#### Instagram Gradient (Official)
```css
.gradient-instagram {
  background: linear-gradient(135deg, 
    #f58529 0%,      /* Orange */
    #dd2a7b 25%,     /* Pink-red */
    #8134af 50%,     /* Purple */
    #515bd4 100%     /* Blue */
  );
}
```

**Usage**: Main CTAs, logo backgrounds, primary buttons

#### Pink Gradient (Secondary)
```css
.gradient-pink {
  background: linear-gradient(135deg,
    #ff6b9d 0%,      /* Light pink */
    #c06c84 50%,     /* Mauve */
    #f67280 100%     /* Coral pink */
  );
}
```

**Usage**: Decorative elements, alternative highlights

#### Text Gradient (Instagram)
```css
.gradient-text {
  background: linear-gradient(135deg, #f58529 0%, #dd2a7b 25%, #8134af 50%, #515bd4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Usage**: Brand name, hero headings, special text

#### Text Gradient (Pink)
```css
.gradient-text-pink {
  background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #f67280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Usage**: Alternative text highlights

## 🎯 Component Style Guidelines

### Buttons

#### Primary Button (CTA)
```jsx
<Button className="gradient-instagram text-white hover:opacity-90 
                   transition-all duration-300 hover:scale-[1.02] 
                   hover:shadow-lg hover:shadow-pink-500/50">
  Click Me
</Button>
```

#### Secondary Button
```jsx
<Button variant="outline" 
        className="border-border hover:bg-secondary 
                   hover:border-pink-500/50 hover:shadow-md">
  Secondary
</Button>
```

### Cards
```jsx
<Card className="border-border bg-card">
  {/* Content */}
</Card>
```

### Inputs
```jsx
<Input className="bg-secondary/50 border-border 
                  focus-visible:ring-primary 
                  focus:ring-2 focus:ring-pink-500/50" />
```

### Hover States
- **Buttons**: Scale to 1.02-1.10, add shadow with pink/purple tint
- **Cards**: Border changes to pink tint, subtle scale to 1.02
- **Icons**: Scale to 1.05-1.10, color shifts to pink (#ff6b9d)

## 🎨 Design Principles

### 1. Light & Airy
- White backgrounds create breathing room
- Minimal shadows for depth, not heaviness
- Generous padding and spacing

### 2. Playful Gradients
- Use Instagram gradient for brand elements
- Apply gradients sparingly for maximum impact
- Logos, CTAs, and key highlights only

### 3. Soft Borders
- Use pink-tinted borders (#ebe5e9)
- Never harsh black borders
- Hover states can intensify to pink-500

### 4. Smooth Transitions
- All interactions should have transitions (200-300ms)
- Scale effects (1.02-1.10) for emphasis
- Opacity changes for disabled states

### 5. Typography
- Clean, readable sans-serif (Inter)
- Adequate line height (1.7 for body)
- Use gradient text sparingly for impact

## 🌟 Icon Guidelines

### Brand Icon (Sparkles)
- Always use Sparkles icon for brand representation
- Place in Instagram gradient container
- White color for icon itself

```jsx
<div className="w-8 h-8 rounded-lg gradient-instagram 
                flex items-center justify-center shadow-md">
  <Sparkles className="h-5 w-5 text-white" />
</div>
```

### Interactive Icons
- Default: muted-foreground color
- Hover: pink-500 (#ef4444 tint)
- Active/Pressed: scale(0.95)

## 📱 Responsive Considerations

### Mobile (< 768px)
- Maintain gradient visibility
- Ensure touch targets are 44x44px minimum
- Stack elements vertically
- Full-width buttons for easy tapping

### Tablet (768px - 1024px)
- Balanced layout
- Sidebar can be toggleable
- Maintain visual hierarchy

### Desktop (> 1024px)
- Fixed sidebar visible
- More generous spacing
- Utilize horizontal space for cards

## ✨ Animation Guidelines

### Micro-interactions
```css
transition: all 0.3s ease;
hover: scale(1.02-1.10);
active: scale(0.95-0.98);
```

### Page Transitions
- Fade in: opacity 0 → 1 (0.5s)
- Slide in: y: 20 → 0 (0.6s)
- Spring animations for playful feel

### Loading States
```jsx
<div className="animate-spin rounded-full h-12 w-12 
                border-b-2 border-pink-500" />
```

## 🎭 Mood & Tone

### Visual Mood
- **Energetic**: Vibrant gradients, smooth animations
- **Friendly**: Rounded corners (0.75rem default)
- **Modern**: Clean lines, generous whitespace
- **Playful**: Subtle scale effects, gradient accents

### Brand Personality
- Instagram-inspired but unique
- Approachable and fun
- Creative and expressive
- Social and engaging

## 🚀 Implementation Checklist

- ✅ All backgrounds are white/light
- ✅ All gradients use Instagram colors
- ✅ All hover states use pink/purple tones
- ✅ All transitions are smooth (300ms)
- ✅ All shadows use pink tints
- ✅ All borders use soft pink colors
- ✅ All focus states use pink ring
- ✅ All brand elements use Instagram gradient
- ✅ All text is readable on light background
- ✅ All interactive elements have proper feedback

## 💡 Quick Tips

1. **Don't overuse gradients** - Reserve for logos, CTAs, and key elements
2. **Maintain contrast** - Ensure text is always readable
3. **Be consistent** - Use the same hover patterns throughout
4. **Test on mobile** - Ensure touch targets are large enough
5. **Keep it light** - Avoid heavy shadows, prefer subtle depth

---

Remember: The goal is to feel like Instagram - vibrant, social, engaging, and fun! 💖✨
