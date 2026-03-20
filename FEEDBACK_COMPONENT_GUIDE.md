# Centralized Feedback Component Guide

The `Feedback` component has been redesigned to be a comprehensive, kid-friendly feedback system with built-in encouragement messages, streak tracking, and consistent styling across the entire app.

## 📦 Component Structure

The `Feedback` component now includes:

### Main Component: `<Feedback />`

Generic feedback display with multiple variants.

```tsx
import Feedback from "../../ui/feedback";

<Feedback
  variant="correct" // "correct" | "incorrect" | "info" | "warning" | "hint" | "success" | "danger"
  message="Custom message"
  onAction={() => handleNext()}
  actionLabel="Next"
  className="mb-8"
/>;
```

**Props:**

- `variant`: Visual style (default: "correct")
- `message`: Custom message to display
- `autoMessage`: Generate random encouragement (unused, kept for compatibility)
- `onAction`: Callback when action button is clicked
- `actionLabel`: Button text (default: "Next")
- `className`: Additional CSS classes

### Sub-component: `Feedback.Correct`

Specialized feedback for correct answers with optional streak badge.

```tsx
<Feedback.Correct
  message="Custom success message (optional)"
  streak={3} // Shows "🔥 3 in a row!" if streak > 1
  onAction={() => handleNext()}
  actionLabel="Next Challenge" // default
  showButton={true}
  className="mb-8"
/>
```

**Features:**

- Green success styling (#90EE90)
- Automatic streak badge display
- Pop-in animation
- Built-in next button (customizable)

### Sub-component: `Feedback.Incorrect`

Specialized feedback for incorrect answers.

```tsx
<Feedback.Incorrect
  message="Custom try-again message (optional)"
  hint="The correct answer was 5" // Optional hint
  onAction={() => handleTryAgain()}
  actionLabel="Try Again" // default
  showButton={true}
  className="mb-8"
/>
```

**Features:**

- Red incorrect styling (#FF6B6B)
- Optional hint display
- Pop-in animation
- Built-in retry button (customizable)

### Sub-component: `Feedback.Streak`

Standalone streak badge component.

```tsx
<Feedback.Streak count={5} animated={true} />
```

**Features:**

- Shows streak only if count ≥ 2
- Gold styling with fire emoji
- Optional bounce animation
- Responsive sizing

## 🎯 Message Generation Functions

### `Feedback.getEncouragement()`

Picks a random encouraging message for correct answers.

```tsx
const msg = Feedback.getEncouragement();
// e.g., "Amazing! 🎉", "Brilliant! 🌟", "Perfect! 👏"
```

**Available Messages:**

- "Amazing! 🎉"
- "Wonderful! ⭐"
- "You got it! 🙌"
- "Brilliant! 🌟"
- "Nailed it! 💥"
- "Perfect! 👏"
- "Awesome! 🚀"
- "Fantastic! 🧡"
- "Super smart! 🧠"
- "Way to go! 🎊"

### `Feedback.getTryAgain()`

Picks a random supportive message for incorrect answers.

```tsx
const msg = Feedback.getTryAgain();
// e.g., "Oops! Try again 🙈", "Almost! Have another go 🔄"
```

**Available Messages:**

- "Oops! Try again 🙈"
- "Not quite… 🤔"
- "Almost! Have another go 🔄"
- "Keep trying! 💪"
- "You can do it! 💫"
- "Let's try once more! 🌈"

### `Feedback.getHint()`

Picks a random encouraging hint message.

```tsx
const hint = Feedback.getHint();
// e.g., "Great effort! 💪", "Getting closer! 🎯"
```

## 📚 Usage Examples

### Example 1: Simple Quiz Component

```tsx
import { useState } from "react";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";

export default function SimpleQuiz() {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = () => {
    setIsCorrect(true); // or false
  };

  const handleNext = () => {
    setIsCorrect(null); // Reset for next question
  };

  return (
    <CourseContent>
      <CourseContent.Title description="Quiz Time!" />

      {/* Question UI here */}
      <button onClick={handleAnswer}>Submit Answer</button>

      {/* Feedback */}
      {isCorrect !== null &&
        (isCorrect ? (
          <Feedback.Correct
            onAction={handleNext}
            actionLabel="Next Question"
            className="mt-8"
          />
        ) : (
          <Feedback.Incorrect
            hint="Try reading the question more carefully"
            onAction={handleNext}
            actionLabel="Try Again"
            className="mt-8"
          />
        ))}
    </CourseContent>
  );
}
```

### Example 2: Game with Streak Tracking

```tsx
const [streak, setStreak] = useState(0);
const [answered, setAnswered] = useState(false);
const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

const handleAnswer = (userAnswer: number) => {
  const correct = userAnswer === correctAnswer;
  setIsCorrect(correct);
  setAnswered(true);

  if (correct) {
    setStreak((s) => s + 1);
  } else {
    setStreak(0);
  }
};

const handleNext = () => {
  setAnswered(false);
  setIsCorrect(null);
  // Load next question...
};

return (
  <>
    {streak > 1 && <Feedback.Streak count={streak} />}

    {answered &&
      (isCorrect ? (
        <Feedback.Correct
          streak={streak}
          onAction={handleNext}
          className="mt-8"
        />
      ) : (
        <Feedback.Incorrect onAction={handleNext} className="mt-8" />
      ))}
  </>
);
```

### Example 3: Multiple Variant Feedback

```tsx
// For different scenarios
<Feedback variant="info" message="Choose the correct answer" />
<Feedback variant="warning" message="Make sure to read carefully" />
<Feedback variant="hint" message="💡 Look at the image above" />
```

## 🎨 Styling & Animations

All feedback components include:

- **Kid-friendly colors** matching the app's pastel palette
- **Pop-in animation** (`animate-pop-in`) for entrance
- **Bounce animation** for streak badge (`animate-bounce-scale`)
- **Consistent border styling** - 4px borders with drop shadows
- **Large, readable text** using Poppins font

### Color Scheme

| Variant          | Background           | Border  | Text    | Icon |
| ---------------- | -------------------- | ------- | ------- | ---- |
| correct/success  | #90EE90 (Green)      | #2D8C40 | #2D2016 | ✅   |
| incorrect/danger | #FF6B6B (Red)        | #C94B4B | White   | ❌   |
| warning          | #FFE5B4 (Peach)      | #FFB347 | #2D2016 | ⚠️   |
| hint             | #A2D2FF (Blue)       | #5B9BFF | #2D2016 | 💡   |
| info             | #BDEFFF (Light Blue) | #5B9BFF | #2D2016 | ℹ️   |

## 🔄 Migration Guide

### Before (Old Approach)

```tsx
// Each component had its own encouragement array
const ENCOURAGEMENTS = ["Amazing! 🎉", "Perfect! 👏"];

// Feedback was rendered manually
{
  feedbackMsg && (
    <div className="text-center space-y-4">
      <div className="font-poppins font-bold text-2xl">{feedbackMsg}</div>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}
```

### After (New Approach)

```tsx
// Use centralized Feedback component
import Feedback from "../../ui/feedback";

{
  feedbackMsg &&
    (isCorrect ? (
      <Feedback.Correct message={feedbackMsg} onAction={handleNext} />
    ) : (
      <Feedback.Incorrect message={feedbackMsg} onAction={handleNext} />
    ));
}

// Or auto-generate messages
const msg = Feedback.getEncouragement();
setFeedbackMsg(msg);
```

## ✅ Best Practices

1. **Always use for feedback**: Replace manual feedback divs with this component
2. **Use auto-messages**: Let the component generate encouraging messages
3. **Pass handlers**: Always provide `onAction` callback for next button
4. **Show streak**: Use `Feedback.Streak` or `Feedback.Correct` with streak prop
5. **Consistent terminology**: Use "Try Again" for incorrect, "Next Challenge" for correct
6. **Keep it simple**: Don't repeat or manipulate the feedback messages

## 📝 Component Location

**File**: `src/components/ui/feedback.tsx`

Import it in any course component:

```tsx
import Feedback from "../../ui/feedback";
```

## 🚀 Current Integration

✅ `src/components/pages/maths/counting1To20.tsx` - Fully integrated

- Uses `Feedback.Correct` for correct answers with streak tracking
- Uses `Feedback.Incorrect` for incorrect answers
- Uses `Feedback.Streak` for streak badge display
- Uses `Feedback.getEncouragement()` and `Feedback.getTryAgain()` for messages

**TODO**: Integrate into remaining components:

- `identifyNumber.tsx`
- `identifyLetter.tsx`
- `readTheClock.tsx`
- `mathTables.tsx`
- `capitalsOfCountries.tsx`
- `capitalsOfIndia.tsx`
- `units.tsx`
- `challengeFlags.tsx`
- And any others using the old Feedback component or manual feedback UI
