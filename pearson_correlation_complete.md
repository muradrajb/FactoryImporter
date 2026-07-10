# Pearson Correlation Coefficient — Complete Build From Scratch

## What This Document Is Trying to Do

We want to answer one question: **"When one variable goes up, does the other tend to go up too, and by how much?"**

That sounds simple, but building a single number that honestly answers it requires solving several deep problems:

- How do we even define "goes up together" mathematically?
- How do we make the answer independent of the units we happen to measure in?
- How do we make the answer sit on a fixed scale so we can compare different datasets?

The Pearson correlation coefficient *r* is the answer that the mathematical community developed over more than a century. But *r* is not just a formula dropped from the sky — it is the **inevitable** result of demanding certain properties from our measure of association. This document will show you, one piece at a time, *why* each part of the formula exists, *what problem it solves*, and *how* each piece connects to the next.

We use **one dataset all the way through** so you can see every idea grounded in real numbers, not floating in abstraction.

---

## The Dataset

**Context:** 10 students, each with a study-time measurement (hours) and an exam score (out of 100).

| Student | *X* (Hours Studied) | *Y* (Exam Score /100) |
|:---:|---:|---:|
| 1 | 6 | 57 |
| 2 | 5 | 51 |
| 3 | 2 | 44 |
| 4 | 8 | 67 |
| 5 | 7 | 63 |
| 6 | 11 | 65 |
| 7 | 8 | 59 |
| 8 | 10 | 79 |
| 9 | 9 | 75 |
| 10 | 9 | 70 |

**Given summary values:**

- x̄ = 7.5 hours (the group average study time)
- ȳ = 63 points (the group average exam score)
- *n* = 10 students

### Notation Convention

Throughout this document, mathematical expressions are written in plain-text style optimized for Markdown readability:

| Symbol | Meaning |
|:---|:---|
| x̄, ȳ | sample means (x-bar, y-bar) |
| σ_x, σ_y | population standard deviations |
| Σ | summation over all *n* students |
| x_dev_i | deviation of student *i* from x̄, i.e. (x_i − x̄) |
| y_dev_i | deviation of student *i* from ȳ, i.e. (y_i − ȳ) |
| SS_x, SS_y | sum of squared deviations for X and Y |
| cov(X,Y) | population covariance |
| √ | square root |

### Narrative Anchors — Four Students We Follow Throughout

To keep the mathematics grounded in human meaning, we will repeatedly return to four specific students whose data tells an interesting story:

- **Student #3** — studied only 2 hrs (5.5 below x̄), scored 44 (19 below ȳ). *The student who barely studied and paid the price.* This student will become our strongest single piece of evidence that study time and score move together.

- **Student #6** — studied 11 hrs (3.5 above x̄), scored 65 (only 2 above ȳ). *The hardest worker who got almost nothing extra for it.* This student challenges the relationship — they represent diminishing returns or perhaps an inefficient study method.

- **Student #7** — studied 8 hrs (0.5 above x̄), scored 59 (4 below ȳ). *Near-average effort but below-average score.* This is our "disagreement" student — maybe they were ill on exam day. They will be the one row that actively *fights* the positive trend.

- **Student #8** — studied 10 hrs (2.5 above x̄), scored 79 (16 above ȳ). *Put in the work, got the reward.* This student exemplifies the positive association we are trying to measure.

---

## The Big Question Before We Begin

Here is the core problem that Pearson's *r* was invented to solve:

> We have 10 pairs of numbers. Some students who study more also score more (supporting a positive relationship). Some students break that pattern (fighting it). We need **one single number** that tells us: overall, how strongly do these two variables move in the same direction — and that number must be **the same** regardless of whether we measure time in hours, minutes, or days, and regardless of whether we measure scores out of 100 or out of 1000.

The formula we will build is:

> ***r*** = Σ(x_dev_i · y_dev_i) / √(SS_x · SS_y)

But **why** this particular formula? Why these particular pieces? That is what we will discover step by step.

---

---

## ACT I — THE AGREEMENT SCORE (Building the Numerator)

### The Goal of This Act

We need to develop a single number that captures whether X and Y "agree" — meaning whether high X tends to come with high Y, and low X tends to come with low Y. By the end of this act, we will have that number (the numerator of *r*), but we will also see **why it is not enough by itself**.

---

### STEP 1 — Center the Data

#### Why Are We Doing This?

Imagine Student #1 scored 57 on the exam. Is that "high" or "low"? You cannot answer that without knowing what the group looks like. A score of 57 is meaningless in isolation — it only becomes informative when we ask: *"Is 57 above or below what we typically see in this group?"*

This is the fundamental insight: **raw values do not carry directional information.** Only positions relative to the group center do.

#### What "Centering" Means Intuitively

When we compute x_dev_i = x_i − x̄, we are asking: *"Is this student above or below the group average, and by how much?"*

- A positive deviation means "above average"
- A negative deviation means "below average"
- The magnitude tells us *how far* above or below

This is the first transformation the formula requires, and it exists because agreement/disagreement is inherently **relative** — it is about positions, not raw values.

#### The Formal Definitions

- **x_dev_i** = x_i − x̄ = (student *i*'s study hours) − 7.5
- **y_dev_i** = y_i − ȳ = (student *i*'s exam score) − 63

#### The Complete Centered Data

| Student | *X* | *Y* | x_dev = *X* − 7.5 | y_dev = *Y* − 63 |
|:---:|---:|---:|---:|---:|
| 1 | 6 | 57 | −1.5 | −6 |
| 2 | 5 | 51 | −2.5 | −12 |
| 3 | 2 | 44 | −5.5 | −19 |
| 4 | 8 | 67 | +0.5 | +4 |
| 5 | 7 | 63 | −0.5 | 0 |
| 6 | 11 | 65 | +3.5 | +2 |
| 7 | 8 | 59 | +0.5 | −4 |
| 8 | 10 | 79 | +2.5 | +16 |
| 9 | 9 | 75 | +1.5 | +12 |
| 10 | 9 | 70 | +1.5 | +7 |

#### What We Can Already See From the Narrative Anchors

- **Student #3:** x_dev = −5.5, y_dev = −19. Strongly below average on both. This student's position *screams* agreement — both variables say "far below the group."
- **Student #6:** x_dev = +3.5, y_dev = +2. Strongly above average on study time, but *barely* above average on score. The X position is loud, but the Y position is almost whispering.
- **Student #7:** x_dev = +0.5, y_dev = −4. Slightly above average on study time, yet *below* average on score. The two variables are pointing in **opposite directions** for this student.
- **Student #8:** x_dev = +2.5, y_dev = +16. Above average on both, and the score deviation is very large — this student's Y-position is the most extreme positive in the entire dataset.

#### What We Have Established and Where We Are Going

**Established:** Centering converts raw measurements into comparable relative positions. Each student now has two signed numbers that say "how far above/below average am I on each variable?"

**The next question:** Now that we know each student's relative position on both variables, how do we detect whether these positions *agree* with each other? We need a mathematical operation that says "both above = agreement, both below = agreement, one above and one below = disagreement."

---

### STEP 2 — Detect Agreement: Multiply the Deviations

#### Why Multiplication Is the Right Operation

We need an operation that does three things simultaneously:

1. **Detects same-direction positions** (both positive or both negative) and calls them "agreement"
2. **Detects opposite-direction positions** (one positive, one negative) and calls them "disagreement"
3. **Weighs larger deviations more heavily** — a student who is *very far* from average on both variables provides stronger evidence than one who is barely displaced

Multiplication does all three naturally through sign arithmetic:

| x_dev sign | y_dev sign | Product sign | What this means |
|:---:|:---:|:---:|:---|
| + | + | **+** (positive) | Both above average → agreement |
| − | − | **+** (positive) | Both below average → agreement |
| + | − | **−** (negative) | Opposite positions → disagreement |
| − | + | **−** (negative) | Opposite positions → disagreement |
| any | 0 | **0** (zero) | One variable is exactly at its mean → no evidence either way |

This is not arbitrary — multiplication is the *only* elementary arithmetic operation with exactly this sign behavior. Addition does not give you this. Absolute differences do not give you this. The product of deviations is a mathematically inevitable choice for measuring pairwise agreement.

#### Why Magnitude Matters Too

Beyond the sign, the **size** of the product matters. When we compute (−5.5) × (−19) = +104.5 for Student #3, the large magnitude tells us: "This student provides strong evidence of positive association because they are far from average on *both* variables."

Compare that to Student #4: (+0.5) × (+4) = +2.0. Both deviations are positive (agreement), but the product is small because the deviations themselves are small. This student is only weakly informative.

**The intuitive meaning:** Each product x_dev_i × y_dev_i is that student's personal "vote" for or against a positive relationship. A large positive product is a loud vote for positive association. A large negative product is a loud vote against it. A small product (positive or negative) is a quiet vote.

#### Computing All 10 Products

| Student | x_dev | y_dev | Product (x_dev × y_dev) | Interpretation |
|:---:|---:|---:|---:|:---|
| 1 | −1.5 | −6 | **+9.0** | Below/below → supports positive relation |
| 2 | −2.5 | −12 | **+30.0** | Below/below → stronger support |
| 3 | −5.5 | −19 | **+104.5** | Student #3: very far below on both → huge support |
| 4 | +0.5 | +4 | **+2.0** | Above/above → small support |
| 5 | −0.5 | 0 | **0.0** | Score exactly at mean → no vote |
| 6 | +3.5 | +2 | **+7.0** | Student #6: far above on X but barely above on Y → small support |
| 7 | +0.5 | −4 | **−2.0** | Student #7: above on X, below on Y → **disagreement** |
| 8 | +2.5 | +16 | **+40.0** | Student #8: above on both, strongly → strong support |
| 9 | +1.5 | +12 | **+18.0** | Above/above → clear support |
| 10 | +1.5 | +7 | **+10.5** | Above/above → moderate support |
| | | | **Σ = 219.0** | **Total: the numerator** |

#### Deep Dive Into What We Just Computed

**Student #3 dominates the sum.** Their product (+104.5) is almost half the entire total (219). Why? Because they are *extremely* far from average on both variables. This reveals something important about how Pearson's *r* works: **extreme students matter more.** A student sitting near the center of the group barely contributes to the correlation — it is the students in the tails who determine the relationship.

**Student #6 is paradoxically weak.** Despite having the highest X value in the entire dataset (11 hours), their product is only +7.0. Why? Because their Y deviation is tiny (+2). This student studied the most but scored only slightly above average. The formula correctly identifies this as weak evidence — having a large deviation on only *one* variable does not constitute strong agreement.

**Student #7 is the only fighter.** Their product is −2.0. This is the only negative contribution in our dataset. It reduces the total by 2 points. In a dataset with stronger disagreements, these negative products would accumulate and drag the sum toward zero or even negative.

**Student #8 is the textbook case.** Large positive deviation on X (+2.5), very large positive deviation on Y (+16), product = +40. This is what strong positive association looks like at the individual level.

#### A Thought Experiment: What If Student #6 Had Scored Poorly?

To feel why the product formula is so sensitive, imagine Student #6 (who studied 11 hours) had scored only 50 instead of 65:

- New y_dev = 50 − 63 = −13
- New product = (+3.5) × (−13) = **−45.5**
- Change from current: +7.0 → −45.5 = a swing of **−52.5**
- New total numerator: 219 − 52.5 = 166.5

One student's outcome change would have significantly weakened the apparent positive relationship. This shows the formula is doing something honest — it is genuinely sensitive to whether the data actually shows agreement.

#### What the Sum = 219 Tells Us (and What It Does NOT Tell Us)

**What it tells us:**
- **Direction:** The sum is positive, so agreement dominates over disagreement in this dataset. More students show "both above" or "both below" than show "one above, one below."
- **The positive relationship is mainly driven by:** Student #3 (far below on both), Student #8 (above on both), and Students #2, #9, #10 (moderate agreement).
- **The relationship is weakened by:** Student #7 (disagreement) and Student #6 (wasted effort).

**What it does NOT tell us:**
- Is 219 "big" or "small"? We have no idea. If we measured time in minutes instead of hours, this number would be 60 × 219 = 13,140 — same relationship, completely different number.
- How does 219 compare to the *maximum possible* agreement with these data? We cannot answer that yet.

This is the critical limitation that will drive the entire next Act.

#### What We Have Established and Where We Are Going

**Established:** The sum of products Σ(x_dev_i × y_dev_i) = 219 is a raw "agreement score." It captures direction (positive means agreement dominates) and is driven primarily by students far from both means.

**The next question:** This number 219 is **uninterpretable** on its own because it depends on measurement units and has no inherent scale. We need to find out: *"What is the maximum this sum could possibly be with these data?"* — and then divide by that maximum to get a number on a fixed scale.

---

---

## ACT II — THE CEILING (Building the Denominator)

### The Goal of This Act

We discovered that 219 is our raw agreement score, but 219 *by itself* is meaningless — it has units baked in and no reference point for "how much is possible." The goal of this Act is to discover the **natural maximum** (ceiling) that the agreement score can reach, given the spreads of X and Y that we have. This ceiling will become the denominator of *r*.

The deep insight here is: **the ceiling is not arbitrary — it is dictated by a mathematical law** (the Cauchy-Schwarz inequality). The formula's denominator is not a design choice; it is the only value that makes the result unit-free and bounded between −1 and +1.

---

### STEP 3 — Why the Numerator Is Meaningless Alone

#### Why Are We Doing This Step?

Before building the denominator, we need to *feel* why it is necessary. The number 219 seems concrete and real — why can't we just use it? There are two devastating problems.

---

#### Problem 1 — The Unit Problem

The number 219 is not a "pure" number. It carries hidden units inside it. Let us expose this:

**Student #8's product in current units (hours × points):**
- x_dev = +2.5 **hours**
- y_dev = +16 **points**
- Product = 2.5 × 16 = 40 **hour-points**

**Now convert study time to minutes** (multiply every X value by 60):
- x_dev becomes 2.5 × 60 = 150 **minutes**
- Product = 150 × 16 = 2,400 **minute-points**

**Now convert study time to 8-hour days** (divide every X value by 8):
- x_dev becomes 2.5 / 8 = 0.3125 **days**
- Product = 0.3125 × 16 = 5 **day-points**

**The same physical relationship produces three wildly different numbers:**

| Units for X | Product for Student #8 | Entire numerator |
|:---|---:|---:|
| Hours | 40 | 219 |
| Minutes | 2,400 | 13,140 |
| 8-hour days | 5 | 27.375 |

This proves that 219 is **not** a measure of the strength of relationship. It is a measure of the strength *times* the unit scales. Any meaningful coefficient must cancel out these unit effects.

---

#### Problem 2 — The Pairing Problem

The second problem is subtler but equally fatal. The deviations x_dev₁, x_dev₂, ..., x_dev₁₀ are **facts about X alone** — they would be identical regardless of what Y values exist. Similarly, the y_dev values are facts about Y alone.

But the numerator depends entirely on **which x_dev gets multiplied by which y_dev** — i.e., the *pairing* of students. The same individual deviations, paired differently, can produce completely different sums.

**Thought experiment — swap only Student #3's and Student #8's exam scores:**

- Student #3 (who studied 2 hrs) now gets Y = 79 → y_dev = +16
  - Old product: (−5.5)(−19) = +104.5
  - New product: (−5.5)(+16) = **−88.0**
  - Change: −192.5

- Student #8 (who studied 10 hrs) now gets Y = 44 → y_dev = −19
  - Old product: (+2.5)(+16) = +40.0
  - New product: (+2.5)(−19) = **−47.5**
  - Change: −87.5

- **Total change from one swap: −280.0**
- **New numerator: 219 − 280 = −61**

One swap of two scores turned a strongly positive sum (+219) into a negative sum (−61)! The actual pairing — who actually got which score — is *everything*. This tells us: the numerator encodes alignment, but we need a reference for "how aligned could things possibly be with this much total spread?"

---

#### What These Two Problems Demand

Together, these problems demand that we divide the numerator by something that:
1. **Carries the same units** as the numerator (so units cancel)
2. **Represents the maximum possible magnitude** of the numerator for the given data spreads (so we get a fixed scale)

This is exactly what the denominator √(SS_x × SS_y) will be.

#### What We Have Established and Where We Are Going

**Established:** The numerator is unstable across unit changes and can swing wildly with different pairings. It is not interpretable alone.

**The next question:** To find the ceiling, we first need to quantify the total "reach" or "spread" of each variable separately. How spread out is X? How spread out is Y? These individual spreads will determine how large the cross-product sum can possibly get.

---

### STEP 4 — Measuring Each Variable's Total Spread

#### Why Are We Doing This Step?

We need to measure how much X varies by itself and how much Y varies by itself — **independently of each other**. This is because the ceiling of the cross-product depends on how much "raw material" each variable has to offer. If X barely varies (everyone studies about the same amount), then even perfect alignment cannot produce a large cross-product sum. The ceiling must respect each variable's individual spread.

#### Why We Square the Deviations

The deviations x_dev₁, x_dev₂, ..., x_dev₁₀ sum to zero (by construction — this is always true for deviations from the mean). So simply adding them up tells us nothing about spread.

We could take absolute values, but **squaring** is the mathematically superior choice for three reasons:

1. **Eliminates sign cancellation** — all squares are non-negative, so extreme values cannot cancel each other out.
2. **Amplifies extremes** — a student 5.5 hours from average contributes 30.25 to the sum, while a student 0.5 from average contributes only 0.25. This means extreme students dominate the spread measure, which is appropriate because they also dominate the cross-product sum (as we saw with Student #3).
3. **Connects to geometry** — the sum of squares equals the squared length of the deviation vector (we will see this in Act IV), which gives Pearson's *r* a beautiful geometric interpretation.

#### Computing SS_x and SS_y

| Student | x_dev | (x_dev)² | y_dev | (y_dev)² |
|:---:|---:|---:|---:|---:|
| 1 | −1.5 | 2.25 | −6 | 36 |
| 2 | −2.5 | 6.25 | −12 | 144 |
| 3 | −5.5 | **30.25** | −19 | **361** |
| 4 | +0.5 | 0.25 | +4 | 16 |
| 5 | −0.5 | 0.25 | 0 | 0 |
| 6 | +3.5 | 12.25 | +2 | 4 |
| 7 | +0.5 | 0.25 | −4 | 16 |
| 8 | +2.5 | 6.25 | +16 | **256** |
| 9 | +1.5 | 2.25 | +12 | 144 |
| 10 | +1.5 | 2.25 | +7 | 49 |
| **Total** | | **SS_x = 62.5** | | **SS_y = 1026** |

#### What These Numbers Mean Intuitively

- **SS_x = 62.5** — This is the "total squared reach" of study times around the average of 7.5 hours. It captures the total variability in X across all students. Notice that Student #3 alone contributes 30.25/62.5 = **48%** of the entire X spread, and Student #6 contributes 12.25/62.5 = 20%. Two students account for 68% of all study-time variability.

- **SS_y = 1026** — This is the "total squared reach" of exam scores around the average of 63 points. Student #3 contributes 361/1026 = 35%, and Student #8 contributes 256/1026 = 25%. Again, extreme students dominate.

#### From Sums of Squares to Standard Deviations

The sum of squares is a *total* — it grows with *n*. To get a per-student typical deviation, we compute:

- **σ_x** = √(SS_x / n) = √(62.5 / 10) = √6.25 = **2.5 hours**
- **σ_y** = √(SS_y / n) = √(1026 / 10) = √102.6 = **10.1292 points**

**Intuitive meaning:**
- σ_x = 2.5 means: "A typical student's study time is about 2.5 hours away from the group average."
- σ_y = 10.13 means: "A typical student's exam score is about 10 points away from the group average."

These standard deviations will appear later in the "sigma form" of the correlation formula.

#### The Crucial Connection: How Individual Spreads Set the Ceiling

Here is the deep insight this step provides: **the cross-product sum (numerator) is bounded by the individual spreads (SS_x and SS_y).** Intuitively:

- If X does not vary much (small SS_x), there is limited "leverage" for X to pull on the cross-product.
- If Y does not vary much (small SS_y), same thing.
- The maximum possible cross-product happens when both variables use their full spread *in perfect coordination.*

The exact mathematical ceiling will be √(SS_x × SS_y) — but to understand *why*, we need to first understand what controls the magnitude of a sum of products.

#### What We Have Established and Where We Are Going

**Established:** SS_x = 62.5 and SS_y = 1026 quantify the total variability in each variable. These are the "raw materials" that constrain how large the cross-product can be.

**The next question:** Why does √(SS_x × SS_y) specifically give the ceiling? To understand this, we first need to see *what makes a sum of products large or small* — which comes down to how you pair the terms.

---

### STEP 5 — What Maximizes a Sum of Products (The Pairing Principle)

#### Why Are We Doing This Step?

We claimed that the cross-product sum has a mathematical ceiling. Before stating the formal theorem, we need to build intuition for *why* there is a ceiling and *what controls it*. The answer is: **how the values are paired**.

#### The Core Insight: Two Numbers

Consider just two pairs. You have {10, 1} from one variable and {9, 2} from the other. Which pairing gives the larger sum of products?

- **Matched pairing** (large with large): 10×9 + 1×2 = 90 + 2 = **92**
- **Crossed pairing** (large with small): 10×2 + 1×9 = 20 + 9 = **29**

The matched pairing wins by a huge margin. Why? Because when you pair the largest values together, you create one very large product. When you cross them, you waste both large values on small partners.

#### The General Principle

> For any two fixed sets of numbers, the sum of their pairwise products is **maximized** when both sets are sorted in the same direction, and **minimized** when sorted in opposite directions.

This is called the **rearrangement inequality** in mathematics. It tells us that the pairing structure *controls* the sum of products, even when the individual values are fixed.

#### Applied to Our Data

Student #8 has x_dev = +2.5. What happens when we (hypothetically) pair this with different possible y_dev values?

| y_dev paired with x_dev = 2.5 | Product |
|---:|---:|
| −19 | −47.5 |
| −12 | −30.0 |
| −6 | −15.0 |
| −4 | −10.0 |
| 0 | 0.0 |
| +2 | +5.0 |
| +4 | +10.0 |
| +7 | +17.5 |
| +12 | +30.0 |
| +16 | **+40.0** |

The product grows linearly as we pair with larger y_dev values. Maximum total sum occurs when **every** large positive x_dev is paired with the correspondingly large positive y_dev, and every large negative x_dev is paired with the correspondingly large negative y_dev.

#### What This Means for the Denominator

The maximum possible sum of products (for these specific deviation values) occurs under the optimal pairing. But there is an even stronger statement: no matter what the values are, the sum of products can **never exceed** √(SS_x × SS_y). This is the Cauchy-Schwarz inequality, which we prove next.

#### What We Have Established and Where We Are Going

**Established:** The magnitude of a sum of products depends on how values are paired. Large-with-large maximizes it; large-with-small wastes potential. There is a natural upper limit based on the available spread.

**The next question:** What exactly is that upper limit? The answer is the Cauchy-Schwarz inequality — the mathematical guarantee that no pairing can exceed √(SS_x × SS_y).

---

### STEP 6 — The Absolute Ceiling: Cauchy-Schwarz Inequality

#### Why Are We Doing This Step?

This step establishes the **mathematical law** that gives us the denominator. Everything up to now has been intuition-building. Now we state the precise theorem that says: no matter how the deviations are arranged, their cross-product sum has a hard upper bound — and that bound is determined entirely by the individual spreads.

#### The Formal Statement

The Cauchy-Schwarz inequality states:

> **[Σ(x_dev_i × y_dev_i)]² ≤ [Σ(x_dev_i²)] × [Σ(y_dev_i²)]**

Taking the square root of both sides:

> **|Σ(x_dev_i × y_dev_i)| ≤ √(SS_x × SS_y)**

In words: *The absolute value of the cross-product sum can never exceed the square root of the product of the two sums of squares.*

#### What This Inequality Means Intuitively

Think of it this way:

- SS_x measures the "total energy" in X (how much variability X has to offer).
- SS_y measures the "total energy" in Y (how much variability Y has to offer).
- The cross-product sum measures how much of that energy is *aligned* between X and Y.
- The inequality says: **aligned energy can never exceed total available energy.**

It is like two people pushing a boulder together. Person X can push with force √SS_x, and person Y can push with force √SS_y. The maximum combined push in one direction is √SS_x × √SS_y = √(SS_x × SS_y). They achieve this maximum only if they push in exactly the same direction. If they push at an angle to each other, some of their energy is wasted.

#### What Happens When Spread Is Zero?

An important edge case: if all students studied exactly 7.5 hours (no variation in X), then every x_dev = 0, and SS_x = 0.

- The ceiling becomes √(0 × SS_y) = 0
- The numerator is also 0 (because every product 0 × y_dev_i = 0)
- Correlation becomes 0/0 = **undefined**

This makes intuitive sense: if there is no variation in study time, we cannot say anything about how study time relates to scores. There is nothing to correlate *with*.

#### Computing the Ceiling for Our Data

- √(SS_x × SS_y) = √(62.5 × 1026) = √64,125 = **253.2291**

#### Verifying the Inequality

- Our actual numerator = 219
- |219| = 219 ≤ 253.2291 ✓

The inequality holds (as it must — it is a mathematical law, not an empirical observation).

#### The Fundamental Conclusion

> **No possible pairing of these deviation values — no rearrangement, no trick — can produce a cross-product sum larger than 253.2291 in absolute value.**

This is why √(SS_x × SS_y) is the *natural* denominator for Pearson's *r*: it is the theoretical maximum of the numerator, determined by the data's own spreads. Dividing by it gives a ratio that is guaranteed to fall between −1 and +1.

#### What We Have Established and Where We Are Going

**Established:** The denominator √(SS_x × SS_y) = 253.2291 is a hard mathematical ceiling on the numerator's magnitude. It comes from the Cauchy-Schwarz inequality and depends only on the individual spreads of X and Y.

**The next question:** Can we *verify* this ceiling experimentally? What happens if we keep the same deviation values but try different pairings? This will make the ceiling feel concrete rather than abstract.

---

### STEP 7 — Testing the Ceiling: Four Scenarios

#### Why Are We Doing This Step?

The Cauchy-Schwarz inequality told us the ceiling is 253.2291. But does this feel real? Let us test it by actually computing the cross-product sum under four different pairings of the same deviation values. This demonstrates that *r* is entirely about alignment quality — not about the values themselves.

#### Setup (Same for All Scenarios)

We fix the two sets of deviations exactly as computed from our data:
- X deviations: {−5.5, −2.5, −1.5, −0.5, +0.5, +0.5, +1.5, +1.5, +2.5, +3.5}
- Y deviations: {−19, −12, −6, −4, 0, +2, +4, +7, +12, +16}

The denominator is **constant** across all scenarios: √(62.5 × 1026) = 253.2291

Only the pairing changes.

#### The Four Scenarios

| Scenario | Pairing Rule | Numerator | *r* = Num / 253.23 |
|:---:|:---|---:|---:|
| **A** | Actual student data (real pairing) | 219 | **+0.8648** |
| **B** | Both sorted ascending (best alignment) | 249 | **+0.9833** |
| **C** | Sorted opposite (worst alignment) | −241 | **−0.9517** |
| **D** | Random shuffle (arbitrary pairing) | 38 | **+0.1501** |

#### What This Demonstrates

1. **Same data, same spreads, completely different correlations.** The only thing that changed is which x_dev got paired with which y_dev. This proves *r* measures *alignment quality*, not the values themselves.

2. **Scenario B (best sort) reaches r = 0.9833, not 1.0000.** Even the optimal sorted pairing does not hit the ceiling exactly! This is because perfect correlation requires exact *proportionality* (y_dev_i = c × x_dev_i), not just same-direction sorting. The shapes of the X and Y deviation sets are different, so even perfectly sorted pairing cannot achieve perfect alignment.

3. **Scenario C (worst sort) reaches r = −0.9517, not −1.0000.** Same reasoning — you cannot achieve the floor either unless the shapes match exactly.

4. **Scenario D (random) is near zero.** Random pairing tends to cancel positive and negative products, giving a sum near zero — meaning no systematic alignment.

5. **Our actual data (Scenario A) is at r = 0.8648.** This is close to the best possible alignment (0.9833), telling us the natural pairing in our data is *quite good* at aligning X and Y, but not perfect. Student #7's disagreement and Student #6's weak agreement are what keep us below the maximum.

#### Placing the Scenarios on the Scale

```
-1.0        -0.5         0         +0.5        +1.0
 |           |           |           |           |
 [C]                    [D]                  [A] [B]
-0.95                  +0.15                +0.86 +0.98
```

#### What We Have Established and Where We Are Going

**Established:** The ceiling is real and verified. Different pairings of the same deviations produce different numerators (and different *r* values), but none exceed the ceiling. Our actual *r* = 0.8648 is strong but not perfect.

**The next question:** What *exactly* does the data need to look like for *r* to equal exactly +1.0? The answer will reveal the deepest meaning of perfect correlation.

---

### STEP 8 — What r = 1.000 Requires: Perfect Proportionality

#### Why Are We Doing This Step?

We saw that even Scenario B (best sorting) only reached r = 0.9833. So what does r = 1 actually require? Understanding this will reveal *what Pearson's r is really measuring*: not just "do they go up together?" but "do they go up together **in exact proportion**?"

#### The One Condition for r = 1

> **For r = +1 to hold, we need:** y_dev_i = *c* × x_dev_i **for every student *i***, where *c* is the same positive constant for all students.

In words: every student's deviation from the Y-mean must be *exactly proportional* to their deviation from the X-mean. If Student #3 is 5.5 below average on X, then they must be exactly *c* × 5.5 below average on Y. If Student #8 is 2.5 above on X, they must be exactly *c* × 2.5 above on Y.

**Why proportionality, and not just same-direction?** Because Cauchy-Schwarz equality holds **if and only if** one vector is a scalar multiple of the other. Sorting in the same direction achieves *monotone alignment* but not *proportional shape*. The shapes can still be different (e.g., X deviations are spread evenly, while Y deviations are clumped), and then perfect correlation is impossible.

#### Testing Our Actual Data for Proportionality

If proportionality held, then y_dev_i / x_dev_i = *c* for all students. Let us check:

| Student | x_dev | y_dev | Ratio y_dev / x_dev |
|:---:|---:|---:|---:|
| 1 | −1.5 | −6 | 4.0000 |
| 2 | −2.5 | −12 | 4.8000 |
| 3 | −5.5 | −19 | 3.4545 |
| 4 | +0.5 | +4 | 8.0000 |
| 5 | −0.5 | 0 | 0.0000 |
| 6 | +3.5 | +2 | 0.5714 |
| 7 | +0.5 | −4 | **−8.0000** |
| 8 | +2.5 | +16 | 6.4000 |
| 9 | +1.5 | +12 | 8.0000 |
| 10 | +1.5 | +7 | 4.6667 |

The ratios are all over the place — ranging from −8 to +8. There is no constant *c*. Therefore, perfect correlation is impossible for this data. The most revealing entries:

- **Student #7** has a *negative* ratio — the only student where Y moves opposite to X.
- **Student #6** has ratio 0.57 — barely any Y response per unit of X.
- **Students #4 and #9** have ratio 8.0 — very high Y response per unit of X.

These inconsistencies are exactly why r = 0.8648 rather than 1.0.

#### Constructing a Perfect r = 1 Example

To see what r = 1 *looks like*, let us manufacture it. Take our actual X deviations and define Y deviations as exactly *c* = 4 times each:

| Student | x_dev | y_dev = 4 × x_dev | Product |
|:---:|---:|---:|---:|
| 1 | −1.5 | −6.0 | +9.0 |
| 2 | −2.5 | −10.0 | +25.0 |
| 3 | −5.5 | −22.0 | +121.0 |
| 4 | +0.5 | +2.0 | +1.0 |
| 5 | −0.5 | −2.0 | +1.0 |
| 6 | +3.5 | +14.0 | +49.0 |
| 7 | +0.5 | +2.0 | +1.0 |
| 8 | +2.5 | +10.0 | +25.0 |
| 9 | +1.5 | +6.0 | +9.0 |
| 10 | +1.5 | +6.0 | +9.0 |
| **Total** | | | **250.0** |

Now verify:
- Numerator = Σ(x_dev × 4·x_dev) = 4 × Σ(x_dev²) = 4 × 62.5 = **250**
- SS_y(new) = Σ(4·x_dev)² = 16 × 62.5 = 1000
- Denominator = √(62.5 × 1000) = √62500 = **250**
- *r* = 250 / 250 = **1.000** ✓

**The algebra in general** (for any *c* > 0):
- Numerator = *c* × SS_x
- SS_y = *c*² × SS_x
- Denominator = √(SS_x × *c*² × SS_x) = *c* × SS_x
- *r* = (*c* × SS_x) / (*c* × SS_x) = **1**

The constant *c* cancels! This is the same cancellation mechanism that makes *r* unit-invariant (which we prove in Step 11).

#### The Three Levels of Alignment

| Level | Condition | *r* value |
|:---|:---|:---:|
| Perfect proportionality | y_dev_i = *c* × x_dev_i for all *i* | **1.000** |
| Best monotone sorting | Same rank order, different shape | 0.9833 |
| Actual data | Various inconsistencies | 0.8648 |

This hierarchy shows that *r* is not just about direction — it measures **proportional fidelity**. Perfect *r* means "if you know how far someone is from average on X, you can compute *exactly* how far they are from average on Y, by multiplying by one fixed number."

#### What We Have Established and Where We Are Going

**Established:** r = 1 requires exact proportionality of deviations (y_dev = c × x_dev for all students). This is stricter than just "both go up together." Our data fails this condition in multiple ways, which is why r < 1.

**The next question:** Now we have all the pieces (numerator = 219, ceiling = 253.23). It is time to assemble the final ratio and see *r* as a position on the [−1, +1] scale.

---

---

## ACT III — THE COMPLETE FORMULA AND ITS INVARIANCE

### The Goal of This Act

We have built the numerator (agreement score) and the denominator (the ceiling from Cauchy-Schwarz). Now we put them together into the final formula, show that it produces a unit-free number between −1 and +1, and prove rigorously that changing measurement units cannot alter the result.

---

### STEP 9 — The Ratio: Placing Our Data on the Scale

#### Why Are We Doing This Step?

We have computed a raw agreement (219) and a ceiling (253.23). The ratio of these is Pearson's *r*. But before writing the formula, let us understand what this ratio *means* in terms of our four scenarios.

#### The Scale from −1 to +1

```
-1.0                    0                         +1.0
 |                      |                           |
 ← maximum             no                   maximum →
   negative          alignment              positive
   alignment                               alignment

 [C]                   [D]                   [A]  [B]
-0.9517              +0.1501              +0.8648 +0.9833
```

#### The Definition of *r*

> ***r* = (actual agreement) / (maximum possible agreement)**
>
> ***r* = Σ(x_dev_i × y_dev_i) / √(SS_x × SS_y)**
>
> ***r* = 219 / 253.2291 = 0.8648**

#### What 0.8648 Means for This Dataset

- The actual cross-product sum (219) is **86.48% of the maximum possible** (253.23).
- This is a strong positive relationship: study time and exam score move together with considerable consistency.
- It is not perfect (not 100%) because of inconsistencies like Student #7 (who studied but scored poorly) and Student #6 (who studied the most but got modest returns).
- The 13.52% "gap" between actual and maximum represents the total effect of all disagreements and non-proportional relationships in the data.

#### What We Have Established and Where We Are Going

**Established:** *r* is a ratio of actual to maximum possible agreement, giving a value between −1 and +1 that is interpretable as "fraction of potential alignment achieved."

**The next question:** Let us now write the full formula in its standard forms and show explicitly where each piece came from in our construction.

---

### STEP 10 — The Full Formula Assembled

#### Why Are We Doing This Step?

Now we assemble the standard textbook formula and explicitly trace each component back to the step where we built it. This shows that *r* is not a mysterious formula — it is a carefully constructed ratio where every piece has a known origin and a clear intuitive role.

#### Form 1: The SS Form (Sum-of-Squares Form)

This is the most direct expression — it is literally "agreement divided by ceiling":

```
              Σ(x_i − x̄)(y_i − ȳ)
  r  =  ─────────────────────────────────────
          √[ Σ(x_i − x̄)² × Σ(y_i − ȳ)² ]
```

Substituting our numbers:

```
         219                 219
  r = ─────────────── = ─────────── = 0.8648
       √(62.5 × 1026)     253.2291
```

**Where each piece came from:**

| Piece | Value | Built in | Role |
|:---|---:|:---|:---|
| Σ(x_i − x̄)(y_i − ȳ) | 219 | Step 2 | Raw agreement score (numerator) |
| Σ(x_i − x̄)² = SS_x | 62.5 | Step 4 | Total variability in X |
| Σ(y_i − ȳ)² = SS_y | 1026 | Step 4 | Total variability in Y |
| √(SS_x × SS_y) | 253.23 | Step 6 | Cauchy-Schwarz ceiling (denominator) |

#### Form 2: The Sigma Form (Covariance / Standard Deviations)

Textbooks often write *r* using covariance and standard deviations. This is the same formula, just divided through by *n*:

```
              cov(X, Y)
  r  =  ─────────────────
            σ_x × σ_y
```

Where:
- **cov(X, Y)** = Σ(x_i − x̄)(y_i − ȳ) / n = 219 / 10 = **21.9**
- **σ_x** = √(SS_x / n) = √(62.5 / 10) = **2.5**
- **σ_y** = √(SS_y / n) = √(1026 / 10) = **10.1292**

```
         21.9              21.9
  r = ─────────────── = ────────── = 0.8648
       2.5 × 10.1292     25.3229
```

**Why this form is equivalent:** Dividing numerator and denominator by *n* (or equivalently, by √(n²) = n) does not change the ratio.

#### Breaking Down What Each Component "Does" in the Formula

1. **The numerator (cov or Σ products)** asks: "Do X and Y move in the same direction? By how much?" It is a signed measure of co-movement.

2. **σ_x in the denominator** normalizes away X's own spread. Without this, a variable measured in larger units would artificially inflate the correlation.

3. **σ_y in the denominator** normalizes away Y's own spread. Same reason.

4. **The product σ_x × σ_y** is the ceiling that represents "maximum possible covariance for these spreads."

5. **The ratio** then asks: "What fraction of the maximum possible co-movement is actually realized?"

#### What We Have Established and Where We Are Going

**Established:** The complete Pearson formula is assembled from pieces we built individually. It exists in two equivalent forms (SS and sigma), both computing the same ratio of agreement to ceiling.

**The next question:** We claimed earlier that *r* does not change when you change measurement units. Let us now prove this rigorously.

---

### STEP 11 — Unit Invariance Proof

#### Why Are We Doing This Step?

In Step 3, we showed that the numerator alone changes wildly when you convert hours to minutes. The whole *point* of dividing by the denominator was to cancel out these unit effects. Now we prove that this cancellation actually works — *r* is truly unit-free.

#### The Proof

Let **X′ = a × X** where *a* is any positive conversion factor (e.g., a = 60 converts hours to minutes).

**Effect on the mean:**
- x̄′ = a × x̄

**Effect on deviations:**
- x_dev_i′ = x_i′ − x̄′ = a·x_i − a·x̄ = a × x_dev_i

**Effect on numerator:**
- Numerator′ = Σ(a × x_dev_i)(y_dev_i) = a × Σ(x_dev_i × y_dev_i) = **a × Numerator**

**Effect on SS_x:**
- SS_x′ = Σ(a × x_dev_i)² = a² × Σ(x_dev_i²) = **a² × SS_x**

**Effect on denominator:**
- Denominator′ = √(a² × SS_x × SS_y) = a × √(SS_x × SS_y) = **a × Denominator**

**Effect on *r*:**
- r′ = (a × Numerator) / (a × Denominator) = Numerator / Denominator = **r**

**The factor *a* appears once in the numerator and once in the denominator, and cancels exactly.**

#### Concrete Verification

Converting hours to minutes (a = 60):

| Quantity | Hours | Minutes (×60) |
|:---|---:|---:|
| Numerator | 219 | 60 × 219 = 13,140 |
| SS_x | 62.5 | 3600 × 62.5 = 225,000 |
| Denominator | 253.2291 | 60 × 253.2291 = 15,193.75 |
| ***r*** | **0.8648** | 13,140 / 15,193.75 = **0.8648** |

The number is identical. This is not coincidence — it is guaranteed by the algebraic structure.

#### Why This Matters Deeply

Unit invariance means *r* measures something **intrinsic** about the relationship between X and Y — something that exists independently of how we happen to measure them. Whether we express study time in seconds, hours, or centuries, the degree to which study time and exam score "agree" is the same. Pearson's *r* captures that intrinsic agreement.

This is the same cancellation mechanism we saw in Step 8: when y_dev = c × x_dev, the constant *c* appears in both numerator and denominator and cancels. Unit conversion is just a special case of this.

#### What We Have Established and Where We Are Going

**Established:** Pearson's *r* is provably unit-invariant. The denominator exactly cancels any scaling factor applied to either variable. This is what makes *r* a "pure" number — a dimensionless measure of linear association.

**The next question:** Everything so far has been algebraic. But there is a beautiful geometric picture hiding inside this formula — one that reveals *r* as the cosine of an angle between vectors. This geometric view provides a second, completely independent way to understand what *r* measures.

---

---

## ACT IV — THE GEOMETRIC MEANING

### The Goal of This Act

We will now reinterpret everything we have done through the lens of geometry. The key insight: if we think of each variable's deviations as a vector in *n*-dimensional space, then Pearson's *r* is literally **the cosine of the angle between those two vectors.** This is not a metaphor — it is an exact mathematical identity.

This geometric view will:
1. Explain why the Cauchy-Schwarz inequality (our ceiling) is true — it becomes obvious geometrically.
2. Give a second intuition for r = 1: the two vectors point in exactly the same direction.
3. Connect variance and standard deviation to vector length.

---

### STEP 12 — The Deviation Vector

#### Why Are We Doing This Step?

We are going to take the 10 deviations of X and treat them as a single point (a vector) in 10-dimensional space. Similarly for Y. This sounds abstract, but it is actually the most natural way to see the geometry of correlation.

#### The Vectors

Each student contributes one coordinate to each vector:

**d_x** = (−1.5, −2.5, −5.5, +0.5, −0.5, +3.5, +0.5, +2.5, +1.5, +1.5)

**d_y** = (−6, −12, −19, +4, 0, +2, −4, +16, +12, +7)

The first coordinate of both vectors belongs to Student 1, the second to Student 2, etc.

- Student #3 contributes coordinate 3: (−5.5) in d_x and (−19) in d_y — both strongly negative, pulling both vectors in a similar direction.
- Student #7 contributes coordinate 7: (+0.5) in d_x and (−4) in d_y — pulling d_x slightly positive but d_y negative in that dimension. This is the coordinate that bends the two vectors apart.

#### Vector Lengths

The **squared length** of a vector is the sum of squares of its coordinates:

- ‖d_x‖² = (−1.5)² + (−2.5)² + ... + (1.5)² = Σ(x_dev_i²) = SS_x = **62.5**
- ‖d_y‖² = (−6)² + (−12)² + ... + (7)² = Σ(y_dev_i²) = SS_y = **1026**

So:
- ‖d_x‖ = √62.5 = **7.9057**
- ‖d_y‖ = √1026 = **32.0312**

**The key connection:** The sums of squares we computed in Step 4 are *exactly* the squared lengths of these vectors. Total variability = vector length squared.

#### The Denominator Is the Product of Vector Lengths

- ‖d_x‖ × ‖d_y‖ = √62.5 × √1026 = √(62.5 × 1026) = √64125 = **253.2291**

This is exactly our Cauchy-Schwarz ceiling from Step 6! The denominator of Pearson's *r* is the product of the two vector lengths.

#### What We Have Established and Where We Are Going

**Established:** The deviation data forms two vectors in *n*-dimensional space. Their squared lengths are the sums of squares (SS_x and SS_y), and the product of their lengths is exactly the Pearson denominator.

**The next question:** The numerator (219) is the dot product of these two vectors. The dot product divided by the product of lengths has a famous meaning in geometry: it is the cosine of the angle between the vectors.

---

### STEP 13 — r as a Cosine: The Angle Between Data Vectors

#### Why Are We Doing This Step?

The single most powerful geometric interpretation of Pearson's *r* is: **it is the cosine of the angle between the two deviation vectors.** This gives correlation a visual meaning — how "aligned" are the directions that X and Y point in?

#### The Dot-Product Identity

From linear algebra, the dot product of two vectors relates to the angle θ between them:

> **d_x · d_y = ‖d_x‖ × ‖d_y‖ × cos(θ)**

Rearranging:

> **cos(θ) = (d_x · d_y) / (‖d_x‖ × ‖d_y‖)**

But the dot product d_x · d_y = Σ(x_dev_i × y_dev_i) = the numerator = 219.

And ‖d_x‖ × ‖d_y‖ = the denominator = 253.2291.

Therefore:

> ***r* = cos(θ) = 219 / 253.2291 = 0.8648**

#### What the Angle Means

| Angle θ | cos(θ) = *r* | Geometric meaning | Statistical meaning |
|:---:|:---:|:---|:---|
| 0° | +1.0 | Vectors point in same direction | Perfect positive correlation |
| 30° | +0.87 | Nearly aligned | Strong positive correlation |
| 60° | +0.50 | Moderate angle | Moderate positive correlation |
| 90° | 0.0 | Perpendicular (orthogonal) | No linear association |
| 120° | −0.50 | Moderate separation | Moderate negative correlation |
| 180° | −1.0 | Opposite directions | Perfect negative correlation |

#### For Our Data

- *r* = 0.8648 → θ = arccos(0.8648) = **30.14°**

The study-time vector and the score vector are separated by about 30 degrees in 10-dimensional space. They are *fairly well aligned* — pointing in largely the same direction — but not perfectly so.

#### Why the Angle Is Not Zero

The angle would be 0° (r = 1) only if d_y were exactly proportional to d_x — meaning the two vectors pointed in exactly the same direction. What bends them apart?

- **Student #7** (coordinate 7) pushes d_x slightly positive but d_y negative in that dimension — this is like one coordinate pulling the vectors in different directions.
- **Student #6** (coordinate 6) pushes d_x strongly positive but d_y only slightly — this mismatched magnitude also creates angular separation.

Every "disagreement" or "non-proportionality" in the data contributes to bending the two vectors apart, increasing the angle and decreasing *r*.

#### Why This View Makes the Cauchy-Schwarz Inequality Obvious

Geometrically, the Cauchy-Schwarz inequality simply says:

> **|cos(θ)| ≤ 1**

Which means: the cosine of any angle is between −1 and +1. That is geometrically obvious! The "hard math" of the Cauchy-Schwarz inequality becomes trivially true when seen as a statement about angles.

#### What We Have Established and Where We Are Going

**Established:** Pearson's *r* = cos(θ) where θ is the angle between the deviation vectors in *n*-dimensional space. Our data's vectors are 30.14° apart, corresponding to strong but imperfect alignment.

**The next question:** How does this geometric view connect back to the familiar statistical concepts of variance and standard deviation?

---

### STEP 14 — Connecting Geometry to Variance and Standard Deviation

#### Why Are We Doing This Step?

We have now built two views of the same formula — the algebraic view (agreement/ceiling) and the geometric view (cosine of angle). This final step connects them to the most common statistical language: variance and standard deviation. This shows that all three perspectives (algebraic, geometric, statistical) are describing *exactly the same thing* in different languages.

#### Variance as Average Squared Vector Coordinate

- **Variance of X** = σ_x² = SS_x / n = ‖d_x‖² / n = 62.5 / 10 = **6.25**
- **Variance of Y** = σ_y² = SS_y / n = ‖d_y‖² / n = 1026 / 10 = **102.6**

Interpretation: Variance is the *average squared coordinate* of the deviation vector. It tells you how large a typical coordinate is (in squared units).

#### Standard Deviation as Scaled Vector Length

- **σ_x** = ‖d_x‖ / √n = 7.9057 / √10 = **2.5**
- **σ_y** = ‖d_y‖ / √n = 32.0312 / √10 = **10.1292**

Interpretation: Standard deviation is the vector length divided by √n — a kind of "per-student average length."

#### How the Sigma Form of *r* Connects to Geometry

The sigma form is *r* = cov(X,Y) / (σ_x × σ_y). Let us trace this back to vectors:

- cov(X,Y) = (d_x · d_y) / n = 219 / 10 = 21.9
- σ_x × σ_y = (‖d_x‖/√n) × (‖d_y‖/√n) = ‖d_x‖ × ‖d_y‖ / n = 253.2291 / 10 = 25.3229

So:
- *r* = 21.9 / 25.3229 = 0.8648

Both numerator and denominator were divided by the same factor *n*, so the ratio is unchanged. The sigma form is just the SS form with a common factor of *n* removed.

#### The Three Languages Summary

| Concept | Algebraic language | Geometric language | Statistical language |
|:---|:---|:---|:---|
| X variability | SS_x = 62.5 | ‖d_x‖² = 62.5 | n × σ_x² = 62.5 |
| Y variability | SS_y = 1026 | ‖d_y‖² = 1026 | n × σ_y² = 1026 |
| Co-movement | Σ(x_dev·y_dev) = 219 | d_x · d_y = 219 | n × cov(X,Y) = 219 |
| Ceiling | √(SS_x·SS_y) = 253.23 | ‖d_x‖×‖d_y‖ = 253.23 | n × σ_x × σ_y = 253.23 |
| **Correlation** | **219 / 253.23 = 0.8648** | **cos(30.14°) = 0.8648** | **cov / (σ_x·σ_y) = 0.8648** |

All three rows for *r* give the same number because they are three descriptions of the same mathematical object.

#### What We Have Established

**Established:** Variance is average squared vector length, standard deviation is scaled vector length, and the sigma form of *r* is the geometric dot-product formula divided through by *n*. All perspectives converge on the same answer: **0.8648**.

---

---

## Complete Flow Summary

### The Story in One Paragraph

We wanted a single number measuring how strongly X and Y move together. We centered the data (Step 1) to get relative positions, multiplied paired deviations (Step 2) to detect agreement, summed them to get a raw score (219). But this score has units and no scale (Step 3), so we measured each variable's individual spread (Step 4), understood why pairing controls magnitude (Step 5), invoked the Cauchy-Schwarz law to find the ceiling (Step 6, ceiling = 253.23), verified it with scenarios (Step 7), and showed r = 1 requires exact proportionality (Step 8). Dividing agreement by ceiling gives *r* = 0.8648 (Steps 9-10), which is unit-invariant (Step 11). Geometrically, this ratio equals the cosine of the angle (30.14°) between the deviation vectors (Steps 12-14).

### The Structured Outline

**ACT I — AGREEMENT SCORE (Numerator)**
1. Center data → x_dev, y_dev for each student
2. Multiply row-by-row → Σ(x_dev × y_dev) = 219

**ACT II — CEILING (Denominator)**
3. Why 219 alone fails: unit-sensitive, pairing-sensitive
4. Compute spread totals: SS_x = 62.5, SS_y = 1026
5. Pairing principle: largest-with-largest maximizes sums
6. Cauchy-Schwarz ceiling: |numerator| ≤ √(SS_x × SS_y) = 253.2291
7. Four scenarios verify the ceiling experimentally
8. r = 1 requires y_dev_i = c × x_dev_i (exact proportionality)

**ACT III — FORMULA + INVARIANCE**
9. The ratio: r = 219 / 253.23 = 0.8648
10. Full formula assembled (SS form and sigma form)
11. Unit invariance: scaling factor cancels in numerator/denominator

**ACT IV — GEOMETRY**
12. Deviation vectors in *n*-D; lengths = √SS
13. r = cos(θ); θ = 30.14° for our data
14. Variance = ‖d‖²/n; all three perspectives converge

---

## Summary Table

| Quantity | Value | Built in Step | Intuitive Meaning | Role in Formula |
|:---|---:|:---:|:---|:---|
| *n* | 10 | Setup | Number of students | Normalization count |
| x̄ | 7.5 | Step 1 | Average study hours | Center for X |
| ȳ | 63 | Step 1 | Average exam score | Center for Y |
| Σ(x_dev × y_dev) | 219 | Step 2 | Raw agreement score | **Numerator** |
| SS_x | 62.5 | Step 4 | Total squared spread in X | Denominator component |
| SS_y | 1026 | Step 4 | Total squared spread in Y | Denominator component |
| √(SS_x × SS_y) | 253.2291 | Step 6 | Maximum possible |numerator| | **Denominator** |
| **r (actual)** | **0.8648** | Step 9 | Fraction of maximum alignment achieved | **The coefficient** |
| r (best sort) | 0.9833 | Step 7 | Near-max with same-direction pairing | Benchmark |
| r (worst sort) | −0.9517 | Step 7 | Near-max negative alignment | Benchmark |
| r (random) | 0.1501 | Step 7 | Minimal alignment | Benchmark |
| σ_x | 2.5 | Step 4 | Typical X distance from x̄ | Sigma form denominator |
| σ_y | 10.1292 | Step 4 | Typical Y distance from ȳ | Sigma form denominator |
| cov(X, Y) | 21.9 | Step 10 | Average co-movement per student | Sigma form numerator |
| θ (angle) | 30.14° | Step 13 | Angle between deviation vectors | Geometric interpretation |
| σ_x² (variance) | 6.25 | Step 14 | Average squared X deviation | Connects to vector length |
| σ_y² (variance) | 102.6 | Step 14 | Average squared Y deviation | Connects to vector length |
