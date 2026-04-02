# Google Forms Creation Guide for BRAINWAVE

## Overview
You need to create **2 Google Forms** manually (Google doesn't allow programmatic form creation without OAuth authentication). The complete field specifications are in `google_forms_specifications.json`.

---

## Form 1: Teacher Participation Form

### Step-by-Step Creation

1. **Go to** https://forms.google.com
2. **Click** "Blank" to create a new form
3. **Set Form Title:** `BRAINWAVE Teacher Participation Form`
4. **Set Description:**
   > Register for an upcoming BRAINWAVE neuroscience workshop. This form helps us tailor the workshop to your needs and confirm your participation.

### Sections & Fields

#### Section 1: Contact Information
- **Full Name** (Short answer, Required) ⭐
- **Email Address** (Short answer, Required) ⭐
- **Phone Number** (Short answer, Required) ⭐

#### Section 2: School & Teaching Information
- **School Name** (Short answer, Required) ⭐
- **School District** (Short answer, Required, placeholder: "e.g., LAUSD") ⭐
- **Grade Level(s) You Teach** (Dropdown, Required) ⭐
  - Elementary (K-5)
  - Middle School (6-8)
  - High School (9-12)
  - Multiple
- **Subject(s) You Teach** (Checkboxes, Required) ⭐
  - Science
  - Biology
  - Chemistry
  - Physics
  - Psychology
  - Math
  - Health
  - Other
- **Years of Teaching Experience** (Short answer, Optional)

#### Section 3: Workshop Selection
- **Which workshop are you registering for?** (Dropdown, Required) ⭐
  - Spring 2026 Workshop (Tentative)
  - Summer 2026 Workshop
  - Other - Contact Me
- **How did you hear about BRAINWAVE?** (Paragraph, Optional)

#### Section 4: Background & Goals
- **Have you attended a neuroscience workshop before?** (Multiple choice, Required) ⭐
  - Yes, a BRAINWAVE workshop
  - Yes, a different neuroscience workshop
  - No, this is my first
- **What topics interest you most?** (Checkboxes, Optional)
  - Brain anatomy & structure
  - Learning & memory
  - Sleep & brain health
  - Mental health & emotional learning
  - Neuroplasticity
  - Hands-on dissection activities
  - EEG demonstrations
  - Technology in neuroscience education
- **What do you hope to gain from this workshop?** (Paragraph, Optional)

#### Section 5: LAUSD Credit & Dietary Needs
- **Are you seeking LAUSD salary point credit?** (Multiple choice, Optional)
  - Yes
  - No
  - Not applicable (I'm not LAUSD)
- **Dietary restrictions or allergies** (Paragraph, Optional, placeholder: "for catering")

---

## Form 2: Instructor Interest Form (UCLA Postdocs)

### Step-by-Step Creation

1. **Go to** https://forms.google.com
2. **Click** "Blank" to create a new form
3. **Set Form Title:** `BRAINWAVE Instructor Interest Form`
4. **Set Description:**
   > UCLA postdoctoral fellows: Join us as a BRAINWAVE workshop instructor! Share your neuroscience expertise with K-12 teachers and inspire the next generation.

### Sections & Fields

#### Section 1: Contact Information
- **Full Name** (Short answer, Required) ⭐
- **UCLA Email Address** (Short answer, Required) ⭐
- **Phone Number** (Short answer, Required) ⭐

#### Section 2: Academic & Research Background
- **Department / Lab** (Short answer, Required) ⭐
- **Principal Investigator (PI) Name** (Short answer, Required) ⭐
- **PhD Institution & Year** (Short answer, Optional, placeholder: "e.g., Stanford University, 2022")
- **Research Focus / Area of Expertise** (Paragraph, Required) ⭐
- **Brief Bio** (Paragraph, Required, helper text: "100-150 words - for website") ⭐

#### Section 3: Teaching & Outreach Experience
- **Have you taught or led outreach activities before?** (Multiple choice, Required) ⭐
  - Yes, extensively
  - Yes, some experience
  - No, but I'm eager to learn
- **Previous teaching or outreach experience** (Paragraph, Optional, placeholder: "if any")
- **Which topics could you teach or present on?** (Checkboxes, Required) ⭐
  - Neuroanatomy & brain structure
  - Learning & memory mechanisms
  - Sleep & circadian rhythms
  - Mental health & neuroscience
  - Neuroplasticity & brain development
  - Sensory systems
  - EEG/neuroimaging techniques
  - Research methods in neuroscience
  - Other (specify below)
- **Other topics** (Short answer, Optional, shown only if "Other" selected above)

#### Section 4: Availability & Commitment
- **Which workshops are you available for?** (Checkboxes, Required) ⭐
  - Spring 2026 Workshop
  - Summer 2026 Workshop
  - Future workshops (TBD)
  - All
- **Can you commit to pre-workshop planning meetings?** (Multiple choice, Required) ⭐
  - Yes
  - Maybe, depends on timing
  - No
- **Any scheduling constraints or preferences?** (Paragraph, Optional)

#### Section 5: Additional Information
- **Why are you interested in teaching with BRAINWAVE?** (Paragraph, Required) ⭐
- **Additional comments or questions** (Paragraph, Optional)

---

## After Creating the Forms

### Step 1: Get Form URLs
1. Click **"Send"** button (top right in Google Forms)
2. Click the **Link** icon
3. Click **"Copy"** to get the form URL
4. **Save both URLs** - you'll need them for the next step

### Step 2: Add URLs to Website
1. Open **brainwave-admin.html** in your browser
2. Navigate to **"Forms & Links"** page (in the sidebar)
3. **Paste the Teacher Form URL** into the "Teacher Participation Form" field
4. **Paste the Instructor Form URL** into the "Instructor Interest Form" field
5. Click **"Save All Changes"** (green button in sidebar)
6. Click **"Publish Public Site"** to export updated data

### Step 3: Verify
1. Open **brainwave-public.html** in your browser
2. Scroll to the **"Join BRAINWAVE"** section
3. Click both form links to ensure they work

---

## Quick Reference

| Form | Target Audience | # of Sections | # of Fields | Est. Time |
|------|----------------|---------------|-------------|-----------|
| Teacher Participation | K-12 Teachers | 5 | 15 | 10-15 min |
| Instructor Interest | UCLA Postdocs | 5 | 16 | 10-15 min |

---

## Tips for Google Forms

- **Use sections** to organize related fields
- Mark required fields with **red asterisks**
- Add **description text** under questions for clarity
- Enable **response receipts** so participants get confirmation emails
- Set **response validation** for email fields
- Consider adding a **confirmation message** after submission
- Link forms to a **Google Sheet** for easy response tracking

---

## Need Help?

Detailed field-by-field specifications are in: `google_forms_specifications.json`
