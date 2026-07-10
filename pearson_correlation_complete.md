# Pearson Correlation Coefficient — Complete Build From Scratch

This document builds Pearson's r from first principles using one dataset all the way through.

Dataset: Hours Studied (X) vs Exam Score out of 100 (Y)

| Student | X (Hours Studied) | Y (Exam Score /100) |
|---|---:|---:|
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

Given:
- x_bar = 7.5 hours
- y_bar = 63 points
- n = 10 students

Notation convention (plain text for Markdown): x_bar, y_bar, sigma_x, sigma_y, cov_xy, sum(...).

Narrative anchors used throughout:
- Student #3: studied 2 hrs (5.5 below x_bar), scored 44 (19 below y_bar): barely studied, paid the price.
- Student #6: studied 11 hrs (3.5 above x_bar), scored 65 (2 above y_bar): studied the most but scored only slightly above average.
- Student #7: studied 8 hrs (0.5 above x_bar), scored 59 (4 below y_bar): near-average effort but below-average score (used throughout as a disagreement row; one possible explanation is illness on exam day).
- Student #8: studied 10 hrs (2.5 above x_bar), scored 79 (16 above y_bar): put in the work, got the reward.

---

## ACT I — THE AGREEMENT SCORE (Building the Numerator)

## STEP 1 — Center the Data

Raw values alone do not tell agreement. We need each student's position relative to the group center.

Definitions:
- x_dev_i = x_i - x_bar
- y_dev_i = y_i - y_bar

| Student | X | Y | x_dev = X - 7.5 | y_dev = Y - 63 |
|---|---:|---:|---:|---:|
| 1 | 6 | 57 | -1.5 | -6 |
| 2 | 5 | 51 | -2.5 | -12 |
| 3 | 2 | 44 | -5.5 | -19 |
| 4 | 8 | 67 | +0.5 | +4 |
| 5 | 7 | 63 | -0.5 | 0 |
| 6 | 11 | 65 | +3.5 | +2 |
| 7 | 8 | 59 | +0.5 | -4 |
| 8 | 10 | 79 | +2.5 | +16 |
| 9 | 9 | 75 | +1.5 | +12 |
| 10 | 9 | 70 | +1.5 | +7 |

Observations tied to the four named students:
- Student #3 is strongly below average on both variables.
- Student #6 is strongly above average on study time, but only slightly above average on score.
- Student #7 is slightly above average on study time but below average on score.
- Student #8 is above average on both, and strongly above on score.

Established: centered data converts raw scores into comparable relative positions.
Next: detect whether deviations agree or fight row by row.

These deviations are the raw material for everything that follows.

## STEP 2 — Detect Agreement: Multiply the Deviations

Sign logic:

| x_dev sign | y_dev sign | Product sign | Interpretation |
|---|---|---|---|
| + | + | + | agreement above average |
| - | - | + | agreement below average |
| + | - | - | disagreement |
| - | + | - | disagreement |
| any | 0 | 0 | no score contribution |

Now compute each product x_dev * y_dev.

| Student | x_dev | y_dev | Product x_dev*y_dev | What happened |
|---|---:|---:|---:|---|
| 1 | -1.5 | -6 | +9.0 | below/below, supports positive relation |
| 2 | -2.5 | -12 | +30.0 | below/below, stronger support |
| 3 | -5.5 | -19 | +104.5 | Student #3: very low study and very low score, huge positive support |
| 4 | +0.5 | +4 | +2.0 | above/above, small support |
| 5 | -0.5 | 0 | 0.0 | score at mean, no push |
| 6 | +3.5 | +2 | +7.0 | Student #6: very high study but only slightly high score, small support |
| 7 | +0.5 | -4 | -2.0 | Student #7: direct disagreement (narrative anchor: possible illness on exam day) |
| 8 | +2.5 | +16 | +40.0 | Student #8: high study and high score, strong support |
| 9 | +1.5 | +12 | +18.0 | above/above, clear support |
| 10 | +1.5 | +7 | +10.5 | above/above, moderate support |
| **Total** |  |  | **219.0** | numerator |

Product story with named students:
- Student #3 has a large positive product because both deviations are large in magnitude.
- Student #6 has a small positive product because one deviation (+3.5) is large but the other (+2) is small.
- Student #7 is the key negative row: above-average hours but below-average score.
- Student #8 has one of the largest positive products because both deviations are sizable and aligned.

Hypothetical stress test for Student #6:
- Current Student #6 product: (+3.5)*(+2) = +7.
- If Student #6 had scored 50 instead of 65, then y_dev would be -13.
- Hypothetical product becomes (+3.5)*(-13) = -45.5.
- One row would switch from weak support to strong contradiction.

Numerator result:
- sum((x_i - x_bar)(y_i - y_bar)) = 219.

What this sum means:
- Direction: positive (agreement dominates).
- Intensity: moderate/strong raw agreement.
- Cancellation: negative rows (Student #7) reduce the total.

Established: we have a raw agreement score of 219.
Next: show why this raw score is not meaningful by itself.

---

## ACT II — THE CEILING (Building the Denominator)

## STEP 3 — Why the Numerator Is Meaningless Alone

### Problem 1 — Unit Problem

Student #8's product in current units:
- x_dev = +2.5 hours
- y_dev = +16 points
- product = 40 hour-points

Convert hours to minutes (multiply X deviations by 60):
- x_dev' = 2.5*60 = 150 minutes
- product' = 150*16 = 2400 minute-points

Convert hours to 8-hour days (divide X deviations by 8):
- x_dev'' = 2.5/8 = 0.3125 days
- product'' = 0.3125*16 = 5 day-points

Same relationship, different numeric size:
- 40 (hour-points)
- 2400 (minute-points)
- 5 (day-points)

So 219 carries units inside it. It is not a pure number.

### Problem 2 — Pairing Problem

Facts:
- X deviations are facts about X alone.
- Y deviations are facts about Y alone.
- The numerator depends on pairing: the same student must keep both deviations in the same row.

Spreadsheet error thought experiment:
- Swap only Student #3 and Student #8 scores.
- Student #3 gets Y=79 (y_dev=+16): product changes from (-5.5)*(-19)=+104.5 to (-5.5)*(+16)=-88.0 (change -192.5).
- Student #8 gets Y=44 (y_dev=-19): product changes from (+2.5)*(+16)=+40.0 to (+2.5)*(-19)=-47.5 (change -87.5).
- Total change = -280.0.

New numerator after this one swap:
- 219 - 280 = -61.

Conclusion:
- The raw numerator is unstable across units and highly sensitive to pairing.
- We need a fixed ceiling computed from each variable's own spread.

Established: numerator alone is not interpretable.
Next: compute total spread of X and Y.

## STEP 4 — Measuring Each Variable's Total Spread

Why square deviations:
- removes sign cancellation
- gives larger weight to extremes (Student #3 and Student #8 matter more)

| Student | x_dev | x_dev^2 | y_dev | y_dev^2 |
|---|---:|---:|---:|---:|
| 1 | -1.5 | 2.25 | -6 | 36 |
| 2 | -2.5 | 6.25 | -12 | 144 |
| 3 | -5.5 | 30.25 | -19 | 361 |
| 4 | +0.5 | 0.25 | +4 | 16 |
| 5 | -0.5 | 0.25 | 0 | 0 |
| 6 | +3.5 | 12.25 | +2 | 4 |
| 7 | +0.5 | 0.25 | -4 | 16 |
| 8 | +2.5 | 6.25 | +16 | 256 |
| 9 | +1.5 | 2.25 | +12 | 144 |
| 10 | +1.5 | 2.25 | +7 | 49 |
| **Total** |  | **62.5** |  | **1026** |

So:
- SS_x = sum((x_i - x_bar)^2) = 62.5
- SS_y = sum((y_i - y_bar)^2) = 1026

Plain-English interpretation:
- SS_x = 62.5 means total squared study-time spread around 7.5 hours.
- SS_y = 1026 means total squared score spread around 63 points.

Population standard deviations:
- sigma_x = sqrt(SS_x / n) = sqrt(62.5/10) = 2.5
- sigma_y = sqrt(SS_y / n) = sqrt(1026/10) = 10.1292

Interpretation:
- typical study-time distance from average is about 2.5 hours.
- typical score distance from average is about 10.13 points.

Spread and ceiling link:
- Cross-sums are bounded by the geometric mean of the self-sums.
- The natural ceiling candidate is sqrt(SS_x * SS_y).

Established: we quantified each variable's total reach.
Next: explain why pairing order controls the sum of products.

## STEP 5 — What Maximizes a Sum of Products

Core two-number fact:
- Ordered pairing: 10*9 + 1*2 = 92
- Swapped pairing: 10*2 + 1*9 = 29
- Larger-with-larger creates the larger total.

General rule:
- For fixed sets of numbers, the sum of pairwise products is maximized when both lists are sorted in the same order and minimized in opposite order.

Applied to our data (Student #8 as a strong multiplier):
- Student #8 has x_dev = +2.5.
- Pairing this with different Y deviations changes impact linearly.

Note: the table below is hypothetical pairing analysis, not Student #8's actual row assignment.

| y_dev paired with Student #8 | Product 2.5*y_dev |
|---:|---:|
| -19 | -47.5 |
| -12 | -30.0 |
| -6 | -15.0 |
| -4 | -10.0 |
| 0 | 0.0 |
| +2 | +5.0 |
| +4 | +10.0 |
| +7 | +17.5 |
| +12 | +30.0 |
| +16 | +40.0 |

Takeaway:
- The biggest deviations dominate the sum.
- Student #3 and Student #8 strongly shape totals because their magnitudes are large.

Established: pairing structure controls attainable agreement scores.
Next: state the absolute mathematical ceiling.

## STEP 6 — The Absolute Ceiling: Cauchy-Schwarz Inequality

Formal statement:

sum(x_dev_i * y_dev_i)^2 <= (sum(x_dev_i^2)) * (sum(y_dev_i^2))

Equivalent bound:

abs(sum(x_dev_i * y_dev_i)) <= sqrt(SS_x * SS_y)

Intuition:
- X has a total reach (from SS_x).
- Y has a total reach (from SS_y).
- Their agreement sum cannot exceed reach(X) * reach(Y).

Zero-spread check:
- If all students studied exactly 7.5 hours, then every x_dev=0 and SS_x=0.
- Ceiling becomes sqrt(0*SS_y)=0.
- Numerator is also 0.
- Correlation is undefined (0/0) because no X variation exists.

Actual ceiling:
- sqrt(SS_x * SS_y) = sqrt(62.5 * 1026) = sqrt(64125) = 253.2291

Inequality verification:
- actual numerator = 219
- 219 <= 253.2291 (true)

Law-level conclusion:
- No pairing, no trick can produce |numerator| above 253.2291 for these fixed deviation sets.

Established: denominator is a hard mathematical ceiling.
Next: test this by changing only pairing while keeping spreads fixed.

## STEP 7 — Testing the Ceiling: Four Scenarios

Setup for all scenarios:
- X deviations fixed: {-5.5, -2.5, -1.5, -0.5, +0.5, +0.5, +1.5, +1.5, +2.5, +3.5}
- Y deviations fixed: {-19, -12, -6, -4, 0, +2, +4, +7, +12, +16}
- Only pairing changes.
- Denominator is constant: sqrt(62.5*1026)=253.2291.

Scenario calculations:
- A (actual pairing): numerator = 219, r = 219/253.2291 = 0.8648
- B (best sort, same direction): numerator = 249, r = 0.9833
- C (worst sort, opposite direction): numerator = -241, r = -0.9517
- D (one random shuffle): numerator = 38, r = 0.1501

| Scenario | Pairing rule | Numerator | Denominator | r |
|---|---|---:|---:|---:|
| A | Actual students | 219 | 253.2291 | +0.8648 |
| B | Sorted with sorted | 249 | 253.2291 | +0.9833 |
| C | Sorted with reverse-sorted | -241 | 253.2291 | -0.9517 |
| D | Random shuffle | 38 | 253.2291 | +0.1501 |

Key observations:
- Same numbers, same spreads, same denominator.
- Only pairing changed.
- r moves because alignment changes.
- Student #7's mismatch row is one local reason actual data is below Scenario B.

Established: r measures realized alignment relative to fixed potential.
Next: define the exact condition for r=1.

## STEP 8 — What r = 1.000 Requires: Perfect Proportionality

One condition only:
- For all i, y_dev_i = c * x_dev_i with the same constant c.

### Check actual data (ratio chaos)

| Student | x_dev | y_dev | y_dev/x_dev |
|---|---:|---:|---:|
| 1 | -1.5 | -6 | 4.0000 |
| 2 | -2.5 | -12 | 4.8000 |
| 3 | -5.5 | -19 | 3.4545 |
| 4 | +0.5 | +4 | 8.0000 |
| 5 | -0.5 | 0 | 0.0000 |
| 6 | +3.5 | +2 | 0.5714 |
| 7 | +0.5 | -4 | -8.0000 |
| 8 | +2.5 | +16 | 6.4000 |
| 9 | +1.5 | +12 | 8.0000 |
| 10 | +1.5 | +7 | 4.6667 |

Not constant, so not perfect proportionality.
- Student #6 has very low ratio.
- Student #7 is negative (the disagreement row discussed earlier).
- Student #8 is high positive.

### Check Scenario B (still not constant)

Best sorting gets close to 1 but still not exact because Y-shape is not a scalar copy of X-shape.

### Full exact examples

Example 1: let c = 0.80 and define y_dev_i = 0.8*x_dev_i for all i.
- numerator = sum(x_dev_i*(0.8*x_dev_i)) = 0.8*sum(x_dev_i^2) = 0.8*62.5 = 50
- SS_y(new) = sum((0.8*x_dev_i)^2) = 0.64*62.5 = 40
- denominator = sqrt(62.5*40) = sqrt(2500) = 50
- r = 50/50 = 1

Example 2: let c = 3.00.
- numerator = 3*62.5 = 187.5
- SS_y(new) = 9*62.5 = 562.5
- denominator = sqrt(62.5*562.5) = 187.5
- r = 187.5/187.5 = 1

Algebra (general c > 0):
- numerator = sum(x_dev_i*(c*x_dev_i)) = c*sum(x_dev_i^2)
- denominator = sqrt(sum(x_dev_i^2)*sum((c*x_dev_i)^2))
- denominator = sqrt(sum(x_dev_i^2)*c^2*sum(x_dev_i^2)) = c*sum(x_dev_i^2)
- r = numerator/denominator = 1

Three-level summary:

| Case | Condition | Result |
|---|---|---|
| Actual data | ratios vary row to row | r = 0.8648 |
| Best sorting | monotone alignment only | r = 0.9833 |
| Perfect proportionality | y_dev_i = c*x_dev_i exactly | r = 1.0000 |

Established: perfect correlation requires exact proportional shape, not just sorted agreement.
Next: place actual r on the normalized scale.

---

## ACT III — THE COMPLETE FORMULA AND ITS INVARIANCE

## STEP 9 — The Ratio

Scale idea:

-1.0 [C]--------------------0[D]-------------------------[A]-[B] +1.0
     -0.9517                +0.1501                       +0.8648 +0.9833

Definition:
- r = actual agreement / maximum possible agreement
- r = numerator / ceiling = 219 / 253.2291 = 0.8648

Interpretation for this dataset:
- strong positive linear alignment, but not perfect.

Established: r is a normalized position between -1 and +1.
Next: assemble the complete formula and fill every component.

## STEP 10 — The Full Formula Assembled

SS form:

r = sum((x_i - x_bar)(y_i - y_bar)) / sqrt(sum((x_i - x_bar)^2) * sum((y_i - y_bar)^2))

With actual values:

r = 219 / sqrt(62.5 * 1026) = 219 / 253.2291 = 0.8648

sigma form (population):

- cov_xy = sum((x_i - x_bar)(y_i - y_bar))/n = 219/10 = 21.9
- sigma_x = sqrt(sum((x_i - x_bar)^2)/n) = sqrt(62.5/10) = 2.5
- sigma_y = sqrt(sum((y_i - y_bar)^2)/n) = sqrt(1026/10) = 10.1292

r = cov_xy / (sigma_x*sigma_y) = 21.9 / (2.5*10.1292) = 0.8648

Piece origins:
- numerator came from Step 2.
- SS_x and SS_y came from Step 4.
- denominator/ceiling came from Step 6.

Established: complete formula is fully constructed from prior steps.
Next: prove invariance to unit scaling.

## STEP 11 — Unit Invariance Proof

Let X' = aX (unit conversion).

Effects:
- x_dev'_i = a*x_dev_i
- numerator' = sum((a*x_dev_i)*y_dev_i) = a*numerator
- SS_x' = sum((a*x_dev_i)^2) = a^2*SS_x
- denominator' = sqrt((a^2*SS_x)*SS_y) = a*sqrt(SS_x*SS_y)

So:
- r' = numerator'/denominator' = (a*numerator)/(a*denominator) = r

Concrete check (hours -> minutes, a=60):
- numerator' = 60*219 = 13140
- denominator' = 60*253.2291 = 15193.7487
- r' = 13140/15193.7487 = 0.8648 (unchanged)

Why this works:
- numerator and denominator carry matching X-units.
- division cancels the unit factor.
- this is the same cancellation mechanism seen in Step 8 with constant c.

Established: Pearson r is unit-free.
Next: reinterpret all of this geometrically.

---

## ACT IV — THE GEOMETRIC MEANING

## STEP 12 — The Deviation Vector

Treat deviations as vectors in 10-dimensional space.

Coordinate order for both vectors is Student 1, 2, 3, ..., 10.

d_x = (-1.5, -2.5, -5.5, +0.5, -0.5, +3.5, +0.5, +2.5, +1.5, +1.5)

d_y = (-6, -12, -19, +4, 0, +2, -4, +16, +12, +7)

Each coordinate is one student's distance from average.
- Student #3 contributes coordinate -5.5 in d_x and -19 in d_y.
- Student #6 contributes +3.5 in d_x and +2 in d_y.
- Student #7 contributes +0.5 in d_x and -4 in d_y.
- Student #8 contributes +2.5 in d_x and +16 in d_y.

Vector lengths:
- ||d_x||^2 = sum(x_dev_i^2) = 62.5
- ||d_y||^2 = sum(y_dev_i^2) = 1026

So:
- ||d_x|| = sqrt(62.5)
- ||d_y|| = sqrt(1026)

Denominator is exactly:
- ||d_x||*||d_y|| = sqrt(62.5*1026) = 253.2291

This is the Cauchy-Schwarz ceiling in geometric form.

Established: total spread is squared vector length; denominator is product of vector lengths.
Next: interpret r as an angle.

## STEP 13 — r as a Cosine

Dot-product identity:

r = (d_x · d_y) / (||d_x|| ||d_y||) = cos(theta)

Angle meaning:
- theta = 0°   -> r = +1 (same direction)
- theta = 90°  -> r = 0 (orthogonal)
- theta = 180° -> r = -1 (opposite direction)

For our data:
- r = 0.8648
- theta = arccos(0.8648) = 30.14°

Interpretation:
- study-time direction and score direction are fairly aligned.
- not perfectly aligned because rows like Student #6 and especially Student #7 bend d_y away from exact proportional alignment with d_x.

Deep interpretation:
- Pearson r is geometric alignment of two centered data vectors.
- "association" here is literally directional similarity in n-dimensional deviation space.

Established: r has a direct geometric angle meaning.
Next: connect this back to variance and standard deviation.

## STEP 14 — Why Variance = ||d||^2 / n

For X:
- variance_x = sum((x_i - x_bar)^2)/n = ||d_x||^2 / n = 62.5/10 = 6.25

For Y:
- variance_y = ||d_y||^2 / n = 1026/10 = 102.6

Interpretation:
- variance is average squared coordinate of the deviation vector.
- standard deviation is RMS coordinate size:
  - sigma_x = ||d_x||/sqrt(n) = 2.5
  - sigma_y = ||d_y||/sqrt(n) = 10.1292

Connection to denominator:
- sigma_x*sigma_y*n = (||d_x||/sqrt(n))*(||d_y||/sqrt(n))*n = ||d_x||*||d_y||
- this equals Pearson denominator.

Established: variance/standard deviation and Pearson denominator are the same geometry in different normalizations.
This completes the build.

---

## Complete Flow Summary (ASCII)

ACT I: AGREEMENT SCORE
  1) Center data -> x_dev, y_dev for all 10 students
  2) Multiply row-wise -> numerator = sum(x_dev*y_dev) = 219

ACT II: CEILING
  3) Why 219 alone fails:
       - unit-sensitive (40 hour-points, 2400 minute-points, 5 day-points)
       - pairing-sensitive (swap #3 and #8 scores -> 219 to -61)
  4) Compute spread totals:
       SS_x = 62.5, SS_y = 1026, sigma_x = 2.5, sigma_y = 10.1292
  5) Pairing principle:
       largest-with-largest maximizes sum of products
  6) Cauchy-Schwarz ceiling:
       |sum(x_dev*y_dev)| <= sqrt(SS_x*SS_y) = 253.2291
  7) Four scenarios (same spreads, only pairing changes):
       A actual: 219 -> r=0.8648
       B best sort: 249 -> r=0.9833
       C worst sort: -241 -> r=-0.9517
       D random: 38 -> r=0.1501
  8) r=1 condition:
       y_dev_i = c*x_dev_i for all i (exact proportionality)

ACT III: FORMULA + INVARIANCE
  9) Ratio meaning:
       r = actual / ceiling = 219 / 253.2291 = 0.8648
 10) Full formula (SS and sigma forms) assembled from prior parts
 11) Unit invariance:
       X->aX gives a in numerator and denominator, cancels exactly

ACT IV: GEOMETRY
 12) Deviation vectors d_x, d_y in 10D; ||d_x||^2=62.5, ||d_y||^2=1026
 13) r = cos(theta), theta = arccos(0.8648)=30.14°
 14) variance = ||d||^2/n; denominator = ||d_x||*||d_y|| = sigma_x*sigma_y*n

Final: Pearson r is normalized alignment of centered vectors.

---

## Summary Table

| Quantity | Value | Where it came from | Meaning | Role |
|---|---:|---|---|---|
| n | 10 | data setup | number of students | normalization count |
| x_bar | 7.5 | given/Step 1 | average study hours | center for X |
| y_bar | 63 | given/Step 1 | average score | center for Y |
| sum(x_dev*y_dev) | 219 | Step 2 | raw agreement score | numerator |
| SS_x = sum(x_dev^2) | 62.5 | Step 4 | total squared spread in X | denominator part |
| SS_y = sum(y_dev^2) | 1026 | Step 4 | total squared spread in Y | denominator part |
| sqrt(SS_x*SS_y) | 253.2291 | Step 6 | max possible magnitude of numerator | denominator/ceiling |
| r (actual) | 0.8648 | Step 9/10 | normalized positive alignment | final coefficient |
| r (best sort) | 0.9833 | Step 7 | near-max alignment under fixed values | scenario benchmark |
| r (worst sort) | -0.9517 | Step 7 | near-max negative alignment | scenario benchmark |
| r (random example) | 0.1501 | Step 7 | weak alignment | scenario benchmark |
| sigma_x | 2.5 | Step 4 | typical X distance from x_bar | sigma form denominator |
| sigma_y | 10.1292 | Step 4 | typical Y distance from y_bar | sigma form denominator |
| cov_xy (population) | 21.9 | Step 10 | average product of centered variables | sigma form numerator |
| theta | 30.14° | Step 13 | angle between deviation vectors | geometric interpretation |
| variance_x | 6.25 | Step 14 | average squared X deviation | spread per coordinate |
| variance_y | 102.6 | Step 14 | average squared Y deviation | spread per coordinate |
