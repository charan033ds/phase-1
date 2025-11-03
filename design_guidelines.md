# Design Guidelines: GitHub File Uploader

## Design Approach

**Selected Approach:** Design System - Developer Tool Aesthetic  
**Primary References:** Linear, GitHub, Vercel  
**Rationale:** Utility-focused developer tool requiring clarity, efficiency, and minimal distraction

**Core Principles:**
- Function over decoration - every element serves a purpose
- Developer-friendly aesthetics with clean, technical feel
- Instant feedback and clear status communication
- Scannable interface with strong visual hierarchy

---

## Typography System

**Font Family:**
- Primary: Inter or Geist Sans (via Google Fonts CDN)
- Monospace: JetBrains Mono for repository names, URLs, and technical content

**Text Hierarchy:**
- Page Title: text-2xl md:text-3xl font-semibold
- Section Headers: text-lg font-medium
- Labels: text-sm font-medium
- Body/Helper Text: text-sm
- Technical Content (URLs, repo names): text-sm font-mono
- Button Text: text-sm font-medium

---

## Layout System

**Spacing Units:** Use Tailwind units of 2, 3, 4, 6, 8, and 12 consistently
- Component gaps: gap-4
- Section padding: p-6 or p-8
- Form field spacing: space-y-4
- Button padding: px-4 py-2 or px-6 py-3

**Container Structure:**
- Single-column centered layout with max-w-2xl
- Main container: min-h-screen with centered content (flex items-center justify-center)
- Card-based primary interface with subtle border
- Responsive padding: p-4 md:p-6 lg:p-8

---

## Component Library

### Primary Upload Card
- Contained card interface with rounded corners (rounded-lg)
- Subtle border treatment
- Internal padding p-6 md:p-8
- Width: w-full max-w-2xl

### Form Elements

**Input Fields:**
- Repository name input with label
- Commit message textarea (3-4 rows minimum)
- Clear placeholder text for guidance
- Focus states with ring treatment
- Height: h-10 for text inputs
- Full-width inputs within container

**File Selection:**
- File/folder input with custom styled button
- Display selected file count and names
- Support for drag-and-drop zone (optional enhancement)
- Clear indication of file selection state

**Buttons:**
- Primary action: "Upload to GitHub" - full-width or prominent placement
- Secondary action: "Choose File/Folder" - standard width
- Height: h-10 or h-11 for comfortable click targets
- Rounded corners: rounded-md
- Primary button: bold, solid treatment
- Disabled states when form incomplete

### Status & Feedback

**Success State:**
- Repository URL display in monospace font
- Copy-to-clipboard functionality
- Success icon with confirmation message
- Subtle success background treatment

**Loading State:**
- Inline spinner or progress indicator
- Button disabled state with loading text
- "Uploading..." status message

**Error Handling:**
- Inline error messages below relevant fields
- Alert-style error banner for critical issues
- Clear, actionable error text

### GitHub Connection Badge
- Small, unobtrusive connected status indicator
- Shows connected GitHub account (if available)
- Placed in header or top-right corner

---

## Layout Structure

**Single-Page Interface:**

1. **Header Section** (optional, minimal if included)
   - App title or logo
   - GitHub connection status

2. **Main Upload Card** (primary focus)
   - Repository name input
   - File/folder selection interface
   - Commit message textarea
   - Upload button (prominent)

3. **Result Display** (conditional)
   - Success message with repository URL
   - Copy link button
   - Option to upload more files

**Vertical Flow:**
- Natural top-to-bottom progression
- Logical form sequence: repo → files → message → action
- Results appear below action button when complete

---

## Visual Enhancements

**Interaction Feedback:**
- Hover states on all interactive elements
- Focus rings for keyboard navigation
- Smooth transitions (transition-all duration-200)
- Button press states

**Technical Details:**
- Monospace font for all GitHub-related data
- Code-like styling for repository URLs
- Icon usage: GitHub logo, upload icon, success checkmark, copy icon
- Use Heroicons via CDN for interface icons

**Visual Rhythm:**
- Consistent 4-unit spacing between form fields
- 6-8 unit padding within main container
- Balanced white space prevents cramped feeling

---

## Images

**No Hero Image Required**  
This is a utility application - imagery would distract from functionality. Focus on clean, efficient interface instead.

---

## Accessibility & Polish

- All form inputs with associated labels
- Keyboard navigation support throughout
- Clear focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Error messages linked to form fields
- Loading and success states announced properly
- Maintain consistent spacing and alignment across all viewport sizes