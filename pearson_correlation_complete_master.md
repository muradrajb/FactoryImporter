# The Pearson Correlation Coefficient — Complete Master Explanation

## PART 0: What We're Measuring

Pearson's correlation coefficient r answers one question: **How closely do two variables move together in a linear fashion?**

The answer is a single number between -1 and +1:
- **r = +1**: perfect positive linear relationship (X up → Y up, always)
- **r = -1**: perfect negative linear relationship (X up → Y down, always)  
- **r = 0**: no linear relationship
- **r = 0.838** (our example): strong positive linear relationship

`[WARNING]` r measures **linear** association only. If Y = X², r might be 0 even though Y is a perfect function of X. Non-linear relationships are invisible to r.

`[WARNING]` r is **undefined** when either variable has zero variance (all values identical). The denominator becomes 0 (division by zero).

`[WARNING]` Correlation does not imply causation. r = 0.838 means the variables co-vary; it does not mean one causes the other.

---

## The Dataset We Use (Exact Numbers)

10 students. X = push-ups completed. Y = sit-ups completed.

| Student | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| X (Push-Ups) | 27 | 22 | 15 | 35 | 30 | 52 | 35 | 55 | 40 | 39 |
| Y (Sit-Ups) | 30 | 26 | 25 | 42 | 38 | 40 | 32 | 54 | 50 | 43 |

Means: $\bar{x} = 35$, $\bar{y} = 38$, n = 10

---

# PART 1: Centering — Why We Subtract the Mean

## What is "centering"?

Centering means subtracting the mean from every value. For X:

$$x_i^{\text{centered}} = x_i - \bar{x}$$

For Y:

$$y_i^{\text{centered}} = y_i - \bar{y}$$

## Why do we do this?

`[THEOREM]` **The mean is the unique minimizer of total squared deviation.**

Proof: Define $S(c) = \sum_{i=1}^{n}(x_i - c)^2$. To minimize, take the derivative and set to zero:

$$\frac{dS}{dc} = -2\sum_{i=1}^{n}(x_i - c) = 0$$

$$\sum_{i=1}^{n}(x_i - c) = 0$$

$$n \cdot c = \sum_{i=1}^{n} x_i$$

$$c = \frac{1}{n}\sum_{i=1}^{n} x_i = \bar{x}$$

**Conclusion:** The mean is the mathematically optimal center. This is why we subtract the mean, not the median, mode, or any other value.

## Compute the means

$$\bar{x} = \frac{27+22+15+35+30+52+35+55+40+39}{10} = \frac{350}{10} = 35$$

$$\bar{y} = \frac{30+26+25+42+38+40+32+54+50+43}{10} = \frac{380}{10} = 38$$

## Compute all deviations

| Student | $x_i$ | $x_i - \bar{x}$ | $y_i$ | $y_i - \bar{y}$ |
|---|---|---|---|---|
| 1 | 27 | -8 | 30 | -8 |
| 2 | 22 | -13 | 26 | -12 |
| 3 | 15 | -20 | 25 | -13 |
| 4 | 35 | 0 | 42 | +4 |
| 5 | 30 | -5 | 38 | 0 |
| 6 | 52 | +17 | 40 | +2 |
| 7 | 35 | 0 | 32 | -6 |
| 8 | 55 | +20 | 54 | +16 |
| 9 | 40 | +5 | 50 | +12 |
| 10 | 39 | +4 | 43 | +5 |

## Key facts about deviations

`[FACT]` The sum of deviations is always zero:

$$\sum_{i=1}^{10}(x_i - \bar{x}) = -8-13-20+0-5+17+0+20+5+4 = 0$$

$$\sum_{i=1}^{10}(y_i - \bar{y}) = -8-12-13+4+0+2-6+16+12+5 = 0$$

`[INTUITION]` Centered values express each student's position relative to the group average. Student #8 is 20 push-ups above average. Student #3 is 20 below. The centering removes the "absolute level" and focuses on **relative position**.

## Shift invariance

`[THEOREM]` Correlation is invariant under shifting either variable.

**Proof:** If we shift X by adding a constant b:

$$X' = X + b$$

Then the shifted deviation is:

$$x'_i - \bar{x}' = (x_i + b) - (\bar{x} + b) = x_i - \bar{x}$$

The centered deviation is unchanged. Therefore, the correlation r is unchanged. ✓

**Meaning:** Whether we measure push-ups as (15, 22, 27, ...) or as (15-10, 22-10, 27-10, ...) = (5, 12, 17, ...), the correlation stays the same. The reference point doesn't matter.

---

# PART 2: Deviation Vectors and Their Geometry

## What is a vector?

A vector is an ordered list of numbers. We can represent our centered data as vectors in $\mathbb{R}^{10}$ (10-dimensional space, one dimension per student).

## The centered X vector

$$x_c = (x_1 - \bar{x}, x_2 - \bar{x}, \ldots, x_{10} - \bar{x})$$

$$x_c = (-8, -13, -20, 0, -5, +17, 0, +20, +5, +4)$$

## The centered Y vector

$$y_c = (y_1 - \bar{y}, y_2 - \bar{y}, \ldots, y_{10} - \bar{y})$$

$$y_c = (-8, -12, -13, +4, 0, +2, -6, +16, +12, +5)$$

## Measuring the "size" of a vector: the Euclidean norm

`[DEFINITION]` The squared Euclidean norm of a vector $v$ is:

$$\|v\|^2 = v_1^2 + v_2^2 + \cdots + v_n^2$$

The norm itself is:

$$\|v\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$$

This extends the Pythagorean theorem to n dimensions.

## Computing the squared norm of $x_c$

$$\|x_c\|^2 = (-8)^2 + (-13)^2 + (-20)^2 + 0^2 + (-5)^2 + 17^2 + 0^2 + 20^2 + 5^2 + 4^2$$

| Student | Deviation | Squared |
|---|---|---|
| 1 | -8 | 64 |
| 2 | -13 | 169 |
| 3 | -20 | 400 |
| 4 | 0 | 0 |
| 5 | -5 | 25 |
| 6 | +17 | 289 |
| 7 | 0 | 0 |
| 8 | +20 | 400 |
| 9 | +5 | 25 |
| 10 | +4 | 16 |
| **SUM** | | **1388** |

$$\|x_c\|^2 = 1388$$

$$\|x_c\| = \sqrt{1388} \approx 37.3$$

## Computing the squared norm of $y_c$

| Student | Deviation | Squared |
|---|---|---|
| 1 | -8 | 64 |
| 2 | -12 | 144 |
| 3 | -13 | 169 |
| 4 | +4 | 16 |
| 5 | 0 | 0 |
| 6 | +2 | 4 |
| 7 | -6 | 36 |
| 8 | +16 | 256 |
| 9 | +12 | 144 |
| 10 | +5 | 25 |
| **SUM** | | **858** |

$$\|y_c\|^2 = 858$$

$$\|y_c\| = \sqrt{858} \approx 29.3$$

## Formal names

`[DEFINITION]` $\|x_c\|^2 = \sum(x_i - \bar{x})^2$ is called the **Sum of Squared Deviations (SSD)** of X.

`[DEFINITION]` $\sigma_x = \sqrt{\|x_c\|^2 / n} = \sqrt{SSD_x / n}$ is the **standard deviation** of X.

$$\sigma_x = \sqrt{1388 / 10} = \sqrt{138.8} \approx 11.8$$

$$\sigma_y = \sqrt{858 / 10} = \sqrt{85.8} \approx 9.3$$

`[WARNING]` For small samples, some use $n-1$ instead of $n$ (Bessel's correction). **Important:** For Pearson r itself, this choice cancels. Whether you use n or n-1, the r value is identical, because both numerator and denominator scale by the same factor. The n-1 correction matters for variance and standard deviation in isolation, not for r.

---

# PART 3: The Inner Product — Measuring Co-Movement

## What is an inner product?

`[DEFINITION]` The inner product of two vectors $u$ and $v$ in $\mathbb{R}^n$ is:

$$\langle u, v \rangle = u_1 v_1 + u_2 v_2 + \cdots + u_n v_n = \sum_{i=1}^{n} u_i v_i$$

## Why compute $\langle x_c, y_c \rangle$?

Because it measures how the two centered vectors "move together." The sign of each term tells us the direction:

`[FACT]`
- If $(x_i - \bar{x})$ and $(y_i - \bar{y})$ are **both positive** (both above their means), the product is **positive** → they moved together.
- If $(x_i - \bar{x})$ and $(y_i - \bar{y})$ are **both negative** (both below their means), the product is **positive** → they moved together.
- If one is positive and one is negative, the product is **negative** → they moved opposite.

## Computing every product

| Student | $x_i - \bar{x}$ | $y_i - \bar{y}$ | Product | Meaning |
|---|---|---|---|---|
| 1 | -8 | -8 | +64 | Both below → agreement |
| 2 | -13 | -12 | +156 | Both below → agreement |
| 3 | -20 | -13 | +260 | Both far below → strong agreement |
| 4 | 0 | +4 | 0 | X exactly average → no info |
| 5 | -5 | 0 | 0 | Y exactly average → no info |
| 6 | +17 | +2 | +34 | Both above, but weak → weak agreement |
| 7 | 0 | -6 | 0 | X exactly average → no info |
| 8 | +20 | +16 | +320 | Both far above → strong agreement |
| 9 | +5 | +12 | +60 | Both above → agreement |
| 10 | +4 | +5 | +20 | Both above → agreement |

## Sum the inner product

$$\langle x_c, y_c \rangle = 64 + 156 + 260 + 0 + 0 + 34 + 0 + 320 + 60 + 20 = 914$$

`[INTUITION]` This value (914) is called the "agreement score" — it accumulates all the co-movement signals. Positive terms mean the variables moved together. If terms were negative and large, they would cancel the positive ones and reduce the sum.

`[WARNING]` 914 alone is meaningless:
1. It carries the units of X × Y (push-ups × sit-ups).
2. If we rescale X by 10, the sum becomes 9140 — the relationship didn't change, only the number.
3. If we pair the same X and Y deviations differently, the sum changes wildly.

**We need a reference maximum.** What is the largest possible value of $\langle x_c, y_c \rangle$ given these two vectors?

---

# PART 4: The Two Mathematical Bounds (Two Different Theorems)

This section distinguishes two theorems that are often confused. **They are different theorems with different equality conditions.**

---

## THEOREM 1: The Rearrangement Inequality

`[THEOREM]` **Rearrangement Inequality** (Hardy, Littlewood, Pólya, 1934):

Given two lists of real numbers $a_1 \leq a_2 \leq \cdots \leq a_n$ and $b_1 \leq b_2 \leq \cdots \leq b_n$, the sum $\sum a_i b_{\sigma(i)}$ is maximized when both lists are sorted in the **same order** (i.e., $\sigma$ is the identity permutation).

### Applying to our data

Sort both $x_c$ and $y_c$ from smallest to largest. Then pair them in sorted order:

**Sorted Scenario B (Best pairing for maximum sum):**

| Index | $x_c$ (sorted) | $y_c$ (sorted) | Product |
|---|---|---|---|
| 1 | -20 | -13 | 260 |
| 2 | -13 | -12 | 156 |
| 3 | -8 | -8 | 64 |
| 4 | -5 | -6 | 30 |
| 5 | 0 | 0 | 0 |
| 6 | 0 | +2 | 0 |
| 7 | +4 | +4 | 16 |
| 8 | +5 | +5 | 25 |
| 9 | +17 | +12 | 204 |
| 10 | +20 | +16 | 320 |

Sum = 1075

$$r_{\text{max by sorting}} = \frac{1075}{\sqrt{1388 \times 858}} = \frac{1075}{1091.3} \approx 0.985$$

`[FACT]` 1075 is the **maximum value** we can achieve by rearranging the given numbers. This is what the Rearrangement Inequality guarantees.

### Why doesn't it reach 1091.3?

`[FACT]` The sorted pairing (1075) does NOT reach the Cauchy-Schwarz ceiling (1091.3). The gap is 1091.3 - 1075 = 16.3.

Why? Look at the ratios of paired elements:

| Pair | $y_c / x_c$ |
|---|---|
| (-20, -13) | 0.65 |
| (-13, -12) | 0.92 |
| (-8, -8) | 1.00 |
| (-5, -6) | 1.20 |
| (0, 0) | undefined |
| (0, +2) | undefined |
| (+4, +4) | 1.00 |
| (+5, +5) | 1.00 |
| (+17, +12) | 0.71 |
| (+20, +16) | 0.80 |

The ratios are **not constant** (0.65, 0.92, 1.00, 1.20, ...). They vary. The Rearrangement Inequality is an upper bound for **permutations of fixed values**. It says: among all ways to pair these specific 10 numbers, sorting gives the max. But the max over permutations is NOT the same as the absolute mathematical ceiling.

---

## THEOREM 2: The Cauchy-Schwarz Inequality

`[THEOREM]` **Cauchy-Schwarz Inequality:**

For any two vectors $u, v \in \mathbb{R}^n$:

$$|\langle u, v \rangle| \leq \|u\| \cdot \|v\|$$

Equivalently (squaring both sides):

$$[\langle u, v \rangle]^2 \leq \|u\|^2 \cdot \|v\|^2$$

### Applying to our data

$$[\langle x_c, y_c \rangle]^2 \leq \|x_c\|^2 \cdot \|y_c\|^2$$

$$914^2 \leq 1388 \times 858$$

$$835,396 \leq 1,190,904$$ ✓ True

The ceiling is:

$$\|x_c\| \cdot \|y_c\| = \sqrt{1388} \times \sqrt{858} = \sqrt{1388 \times 858} = \sqrt{1,190,904} \approx 1091.3$$

### The equality condition for Cauchy-Schwarz

`[FACT]` Equality $\langle x_c, y_c \rangle = \|x_c\| \cdot \|y_c\|$ holds **if and only if** $y_c = \lambda x_c$ for some scalar $\lambda > 0$.

This means: **every element of $y_c$ must be a positive multiple of the corresponding element of $x_c$.**

$$\frac{(y_c)_i}{(x_c)_i} = \lambda \text{ for ALL } i$$

In our data, this is not the case. The ratios vary (0.65, 0.92, 1.00, 1.20, 0.71, 0.80, ...). So we cannot reach the ceiling by rearranging.

### Verification with perfect proportionality

**Scenario with c = 0.80:**

Construct a new Y where $y'_c = 0.80 \cdot x_c$:

| Student | $x_c$ | $y'_c = 0.80 \cdot x_c$ | Product |
|---|---|---|---|
| 1 | -8 | -6.4 | 51.2 |
| 2 | -13 | -10.4 | 135.2 |
| 3 | -20 | -16.0 | 320.0 |
| 4 | 0 | 0 | 0 |
| 5 | -5 | -4.0 | 20.0 |
| 6 | +17 | +13.6 | 231.2 |
| 7 | 0 | 0 | 0 |
| 8 | +20 | +16.0 | 320.0 |
| 9 | +5 | +4.0 | 20.0 |
| 10 | +4 | +3.2 | 12.8 |

Sum of products = 1110.4

New squared deviations: $\|y'_c\|^2 = 0.80^2 \times 1388 = 0.64 \times 1388 = 888.32$

Denominator: $\sqrt{1388 \times 888.32} = \sqrt{1,232,988} = 1110.4$

$$r = \frac{1110.4}{1110.4} = 1.000$$ ✓

`[FACT]` When $y_c = 0.80 \cdot x_c$ exactly, numerator equals denominator → r = 1.

**Scenario with c = -0.80:**

Construct $y'_c = -0.80 \cdot x_c$:

| Student | $x_c$ | $y'_c = -0.80 \cdot x_c$ | Product |
|---|---|---|---|
| 1 | -8 | +6.4 | -51.2 |
| 2 | -13 | +10.4 | -135.2 |
| 3 | -20 | +16.0 | -320.0 |
| ... | ... | ... | ... |

Sum of products = -1110.4

Denominator: $\sqrt{1388 \times 888.32} = 1110.4$

$$r = \frac{-1110.4}{1110.4} = -1.000$$

`[FACT]` When $y_c = -0.80 \cdot x_c$, the numerator is negative and equals negative denominator → r = -1.

### The distinction

| | **Rearrangement Inequality** | **Cauchy-Schwarz Inequality** |
|---|---|---|
| What it bounds | Sum of products over permutations of **fixed** numbers | Inner product of **any** vectors with given norms |
| Equality condition | Sorted order | Proportional vectors: $y = \lambda x$ |
| In our data | Max = 1075 (ratio varies: 0.65–1.20) | Ceiling = 1091.3 (needs ratio constant) |
| Conclusion | Sorting maximizes among permutations | To reach ceiling, vectors must be exactly proportional |

---

# PART 5: The Four Scenarios

All four scenarios use the same two vectors $x_c$ and $y_c$. Only the pairing changes. The SSD values remain constant: $\|x_c\|^2 = 1388$, $\|y_c\|^2 = 858$. The denominator always equals 1091.3.

## Scenario A: The Actual Data (Real Student Pairings)

| Student | $x_c$ | $y_c$ | Product |
|---|---|---|---|
| 1 | -8 | -8 | 64 |
| 2 | -13 | -12 | 156 |
| 3 | -20 | -13 | 260 |
| 4 | 0 | +4 | 0 |
| 5 | -5 | 0 | 0 |
| 6 | +17 | +2 | 34 |
| 7 | 0 | -6 | 0 |
| 8 | +20 | +16 | 320 |
| 9 | +5 | +12 | 60 |
| 10 | +4 | +5 | 20 |

$$\langle x_c, y_c \rangle = 914$$

$$r_A = \frac{914}{1091.3} \approx 0.838$$

**Interpretation:** Students #3 and #8 are the main contributors (260 + 320 = 580 out of 914 = 63.5%). These extreme students carry the correlation. Student #6, despite having a strong X deviation (+17), has a weak Y deviation (+2), so contributes only +34.

## Scenario B: Best Possible Alignment (Sorted Rearrangement)

| Index | $x_c$ | $y_c$ | Product |
|---|---|---|---|
| 1 | -20 | -13 | 260 |
| 2 | -13 | -12 | 156 |
| 3 | -8 | -8 | 64 |
| 4 | -5 | -6 | 30 |
| 5 | 0 | 0 | 0 |
| 6 | 0 | +2 | 0 |
| 7 | +4 | +4 | 16 |
| 8 | +5 | +5 | 25 |
| 9 | +17 | +12 | 204 |
| 10 | +20 | +16 | 320 |

$$\langle x_c, y_c \rangle_{\text{sorted}} = 1075$$

$$r_B = \frac{1075}{1091.3} \approx 0.985$$

**Interpretation:** Sorting concentrates all "multiplying power" optimally. The strongest positive deviations pair with strong positive deviations. This is the best we can do with a rearrangement. It does not reach 1.000 because the data is not perfectly proportional.

## Scenario C: Worst Possible Alignment (Sorted Opposite)

Pair most negative X with most positive Y, and vice versa:

| Index | $x_c$ | $y_c$ (reversed) | Product |
|---|---|---|---|
| 1 | -20 | +16 | -320 |
| 2 | -13 | +12 | -156 |
| 3 | -8 | +5 | -40 |
| 4 | -5 | +4 | -20 |
| 5 | 0 | +2 | 0 |
| 6 | 0 | 0 | 0 |
| 7 | +4 | -6 | -24 |
| 8 | +5 | -8 | -40 |
| 9 | +17 | -12 | -204 |
| 10 | +20 | -13 | -260 |

$$\langle x_c, y_c \rangle_{\text{worst}} = -1064$$

$$r_C = \frac{-1064}{1091.3} \approx -0.975$$

**Interpretation:** Every strong multiplier is paired with an opposite-direction value, creating maximum disagreement. This is the worst pairing.

## Scenario D: Random Pairing (No Pattern)

Assign Y deviations to random rows:

| Student | $x_c$ | $y_c$ (random) | Product |
|---|---|---|---|
| 1 | -8 | +5 | -40 |
| 2 | -13 | +16 | -208 |
| 3 | -20 | +4 | -80 |
| 4 | 0 | -12 | 0 |
| 5 | -5 | -6 | +30 |
| 6 | +17 | 0 | 0 |
| 7 | 0 | +12 | 0 |
| 8 | +20 | -8 | -160 |
| 9 | +5 | -13 | -65 |
| 10 | +4 | +2 | +8 |

$$\langle x_c, y_c \rangle_{\text{random}} = -515$$

$$r_D = \frac{-515}{1091.3} \approx -0.472$$

**Interpretation:** Positive and negative products nearly cancel. There is signal (student #5 contributes +30, student #10 contributes +8), but also noise (student #8 contributes -160). Result is weak negative correlation.

## Summary Table

| Scenario | Strategy | Sum | r |
|---|---|---|---|
| B | Best sorting | +1075 | +0.985 |
| A | Actual data | +914 | +0.838 |
| D | Random | -515 | -0.472 |
| C | Worst sorting | -1064 | -0.975 |

`[FACT]` The denominator (1091.3) is **identical in all four scenarios** because it depends only on the individual vectors $x_c$ and $y_c$, not on how they are paired. When you rearrange which Y goes with which X, you change only the numerator $\langle x_c, y_c \rangle$.

---

# PART 6: The Formula

The Pearson correlation coefficient r is:

$$r = \frac{\langle x_c, y_c \rangle}{\|x_c\| \cdot \|y_c\|} = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2} \cdot \sqrt{\sum_{i=1}^{n}(y_i-\bar{y})^2}}$$

For our data:

$$r = \frac{914}{\sqrt{1388} \times \sqrt{858}} = \frac{914}{\sqrt{1,190,904}} = \frac{914}{1091.3} \approx 0.838$$

## Alternative form using standard deviation

`[THEOREM]` The formula is equivalent to:

$$r = \frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{n \cdot \sigma_x \cdot \sigma_y}$$

**Proof of equivalence:**

$$n \cdot \sigma_x \cdot \sigma_y = n \cdot \frac{\sqrt{\sum(x_i-\bar{x})^2}}{\sqrt{n}} \cdot \frac{\sqrt{\sum(y_i-\bar{y})^2}}{\sqrt{n}}$$

$$= n \cdot \frac{\sqrt{\sum(x_i-\bar{x})^2 \cdot \sum(y_i-\bar{y})^2}}{n}$$

$$= \sqrt{\sum(x_i-\bar{x})^2 \cdot \sum(y_i-\bar{y})^2}$$

Therefore both formulas are identical. ✓

---

# PART 7: The Geometric Meaning — r = cos θ

## The angle between two vectors

`[DEFINITION]` The angle θ between two vectors $u, v \in \mathbb{R}^n$ is defined by:

$$\cos\theta = \frac{\langle u, v \rangle}{\|u\| \cdot \|v\|}$$

This is the standard definition in any inner product space. It generalizes the familiar 2D and 3D angle formula to n dimensions.

## Pearson r IS the cosine

`[FACT]`

$$r = \cos\theta$$

where θ is the angle between the centered vectors $x_c$ and $y_c$ in $\mathbb{R}^{10}$.

## Why r is bounded by [-1, 1]

`[FACT]` The cosine function satisfies $-1 \leq \cos\theta \leq 1$ for all θ. Therefore:

$$-1 \leq r \leq 1$$

This bound is not arbitrary. It is a direct consequence of the fact that r is the cosine of an angle.

## Interpreting the angle

For our data:

$$\theta = \arccos(0.838) \approx 33°$$

**What this means:**

- $r = +1$ (θ = 0°): Vectors point in exactly the same direction. $y_c$ and $x_c$ are perfectly aligned. Every Y deviation is a positive multiple of the X deviation.
  
- $r = -1$ (θ = 180°): Vectors point in exactly opposite directions. Every Y deviation is a negative multiple of the X deviation.
  
- $r = 0$ (θ = 90°): Vectors are perpendicular (at right angles). There is no linear relationship.
  
- $r = 0.838$ (θ ≈ 33°): The two vectors make an angle of about 33 degrees in 10-dimensional space. They point generally the same direction, but not perfectly.

`[WARNING]` The angle lives in $\mathbb{R}^{10}$ (one dimension per student). We cannot draw or visualize it directly. But the mathematics is identical to the familiar angle formula in 2D or 3D.

---

# PART 8: Scale Invariance Proof

Pearson r is **invariant** under linear transformations of either variable. This means shifting or rescaling the data does not change r.

## Case 1: Shifting X

If we shift X by a constant b:

$$X' = X + b$$

Then the new mean is:

$$\bar{x}' = \bar{x} + b$$

The new centered deviations are:

$$x'_i - \bar{x}' = (x_i + b) - (\bar{x} + b) = x_i - \bar{x}$$

The centered deviations are **unchanged**. Since r depends only on centered deviations, r is unchanged.

$$r' = r$$ ✓

**Interpretation:** Whether we measure push-ups as (15, 22, 27, ...) or (5, 12, 17, ...) or (215, 222, 227, ...), the correlation is identical. The reference point (the zero point) does not matter.

## Case 2: Scaling X

If we scale X by a positive constant a > 0:

$$X' = aX$$

The new mean is:

$$\bar{x}' = a\bar{x}$$

The new centered deviations are:

$$x'_i - \bar{x}' = ax_i - a\bar{x} = a(x_i - \bar{x})$$

Every centered deviation is multiplied by a.

### Effect on numerator:

$$\langle x'_c, y_c \rangle = \sum [a(x_i - \bar{x})](y_i - \bar{y}) = a \sum(x_i - \bar{x})(y_i - \bar{y}) = a \langle x_c, y_c \rangle$$

Numerator is multiplied by a.

### Effect on denominator:

$$\|x'_c\| = \sqrt{\sum[a(x_i-\bar{x})]^2} = \sqrt{a^2 \sum(x_i-\bar{x})^2} = a\sqrt{\sum(x_i-\bar{x})^2} = a\|x_c\|$$

$$\|x'_c\| \cdot \|y_c\| = a\|x_c\| \cdot \|y_c\|$$

Denominator is multiplied by a.

### The ratio:

$$r' = \frac{a \langle x_c, y_c \rangle}{a\|x_c\| \cdot \|y_c\|} = \frac{\langle x_c, y_c \rangle}{\|x_c\| \cdot \|y_c\|} = r$$

$$r' = r$$ ✓

**Verification with numbers:** If a = 10 (X measured in tenths of push-ups):

- Numerator: $10 \times 914 = 9140$
- Denominator: $10 \times \sqrt{1388} \times \sqrt{858} = 10 \times 1091.3 = 10913$
- Ratio: $9140 / 10913 = 0.838$ ✓

### Case 2b: Scaling X by a negative constant a < 0

If a < 0:

$$x'_i - \bar{x}' = a(x_i - \bar{x})$$

Numerator: $a \langle x_c, y_c \rangle$

Denominator: $|a| \|x_c\| \cdot \|y_c\|$ (because $\sqrt{a^2} = |a|$)

$$r' = \frac{a \langle x_c, y_c \rangle}{|a| \|x_c\| \cdot \|y_c\|} = \frac{a}{|a|} \cdot \frac{\langle x_c, y_c \rangle}{\|x_c\| \cdot \|y_c\|}$$

If a < 0, then $a/|a| = -1$:

$$r' = -r$$

`[FACT]` Multiplying by a negative constant **reverses the sign of the correlation**. This is correct behavior: if we measure "rest days" instead of "training days", the correlation with push-ups should flip sign.

## Summary: r is scale-invariant and shift-invariant

`[THEOREM]` Pearson r is invariant under:
- **Shifting:** $X \to X + b$ does not change r
- **Positive scaling:** $X \to aX$ (a > 0) does not change r
- **Negative scaling:** $X \to aX$ (a < 0) reverses the sign of r (correct behavior)

This is why r is a "pure" measure of association, independent of units and reference points.

---

# PART 9: Limitations of Pearson r

## Limitation 1: Linearity Only

`[WARNING]` Pearson r measures **linear** association. Non-linear relationships can give r ≈ 0 despite perfect dependence.

**Example: Y = X²**

Data: X = (-3, -2, -1, 0, 1, 2, 3), Y = (9, 4, 1, 0, 1, 4, 9)

Means: $\bar{x} = 0$, $\bar{y} = 4$

Centered deviations:
- $x_c = (-3, -2, -1, 0, 1, 2, 3)$
- $y_c = (5, 0, -3, -4, -3, 0, 5)$

Products:
- (-3)(5) = -15
- (-2)(0) = 0
- (-1)(-3) = 3
- (0)(-4) = 0
- (1)(-3) = -3
- (2)(0) = 0
- (3)(5) = 15

Sum = -15 + 0 + 3 + 0 - 3 + 0 + 15 = 0

$$\langle x_c, y_c \rangle = 0$$

$$r = 0$$

`[FACT]` Despite Y being a perfect function of X, r = 0 because the relationship is not linear. This is a critical limitation.

## Limitation 2: Outlier Sensitivity

`[WARNING]` Extreme values have disproportionate influence on r.

**In our dataset:**

Students #3 and #8 contribute:

- Student #3: product = +260
- Student #8: product = +320
- Total: 580

Total sum: 914

Percentage: 580 / 914 ≈ 63.5%

Just 2 out of 10 students (20%) contribute over 63% of the entire correlation. A single extreme observation can dominate the result.

## Limitation 3: Correlation Does Not Imply Causation

`[WARNING]` r = 0.838 means push-ups and sit-ups co-vary. It does **not** mean one causes the other.

Possible explanations:
1. Push-ups cause better core strength, which improves sit-ups.
2. Sit-ups cause better core strength, which improves push-ups.
3. Both are driven by a third variable: overall fitness level, training frequency, genetics, etc.

Correlation is a necessary condition for causation, but not sufficient. Establishing causation requires experimental control or additional evidence.

## Limitation 4: r Undefined When Variance is Zero

`[WARNING]` If all X values are identical, r is undefined.

**Why:** $SSD_x = \sum(x_i - \bar{x})^2 = 0$ (all deviations are zero)

The denominator $\|x_c\| \cdot \|y_c\| = 0 \cdot \|y_c\| = 0$

The numerator $\langle x_c, y_c \rangle = 0$ (all products are $0 \times (y_i - \bar{y}) = 0$)

The expression becomes 0/0, which is indeterminate.

**Interpretation:** If one variable does not vary, we cannot measure its linear relationship with another variable.

---

# PART 10: Summary Table

| Symbol | Formal Name | Our Data |
|---|---|---|
| $\bar{x}$ | Sample mean of X | 35 |
| $\bar{y}$ | Sample mean of Y | 38 |
| n | Sample size | 10 |
| $x_c$ | Centered X vector | (-8, -13, -20, 0, -5, +17, 0, +20, +5, +4) |
| $y_c$ | Centered Y vector | (-8, -12, -13, +4, 0, +2, -6, +16, +12, +5) |
| $\langle x_c, y_c \rangle$ | Inner product / unnormalized covariance | 914 |
| $SSD_x$ | Sum of squared deviations of X | 1388 |
| $SSD_y$ | Sum of squared deviations of Y | 858 |
| $\|x_c\|$ | Euclidean norm of centered X | √1388 ≈ 37.3 |
| $\|y_c\|$ | Euclidean norm of centered Y | √858 ≈ 29.3 |
| $\sigma_x$ | Standard deviation of X | √(1388/10) ≈ 11.8 |
| $\sigma_y$ | Standard deviation of Y | √(858/10) ≈ 9.3 |
| $\|x_c\| \cdot \|y_c\|$ | Cauchy-Schwarz ceiling | √(1388 × 858) ≈ 1091.3 |
| $r$ | Pearson correlation coefficient | 914 / 1091.3 ≈ 0.838 |
| $\theta$ | Angle between $x_c$ and $y_c$ | arccos(0.838) ≈ 33° |

---

# Conclusion

Pearson's r = 0.838 means:

- The centered push-up and sit-up vectors make an angle of 33° in 10-dimensional space.
- They point generally in the same direction, but not perfectly.
- 83.8% of the maximum possible linear co-variation is achieved.
- Students who do more push-ups tend to do more sit-ups, with strong consistency.
- The relationship is linear and robust to scale and shift changes.
- Extreme students (#3, #8) drive much of the signal.
- The relationship might be caused by shared fitness, training, or genetics — but r alone does not tell us which.
