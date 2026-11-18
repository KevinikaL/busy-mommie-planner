
# Busy Mommie Planner

## App Description

A busy mom needs help organizing her daily schedule because she has many responsibilities, including managing her children's activities.

Busy Mommie Planner will help parents create a daily and weekly timeline to make family tasks easier to organize and accomplish.

## Persona

**Name and situation:** Jasmine is a busy mother managing her children's schedules and household responsibilities.

**Frustration:** She struggles to keep track of everyone's daily activities.

**Goal:** Organize family tasks by day, time, and family member.

**When she would use the app:** In the morning to plan her day and throughout the day to check scheduled tasks.

## In This Version

1. A visitor can view a list of family tasks organized by time and day of the week.
2. A visitor can add a task with a day, time, category, and name.
3. A visitor can delete tasks that are no longer needed.

## Left Out, and Why

1. **Notifications and reminders:** These are left out to keep the first version simple.
2. **User accounts and login:** Authentication would add complexity beyond the current project requirements.
3. **Photo uploads:** The first version will use a preset welcome image instead of allowing users to upload their own photos.

## Wireframe

The application will have two main pages:

### Welcome Page

- App title
- Welcome image
- Short introduction
- Button to open the planner

### Schedule Page

- App title
- Family schedule
- Time, Day, Category, Event, and Name columns
- Form to add new tasks
- Button to delete tasks

![Busy Mommie Planner Wireframe](wireframe.png)

## Supabase Table Design

**Table name:** `weekly_daily_planner`

| Column | Type | Example Value |
|---|---|---|
| times | text | 8:00 AM |
| days | text | Monday |
| category | text | School |
| task | text | Drop off |
| names | text | Mom |

Supabase automatically creates the `id` and `created_at` columns.

## Three Example Rows

| Times | Days | Category | Task | Names |
|---|---|---|---|---|
| 8:00 AM | Monday | School | Drop off | Mom |
| 10:00 AM | Tuesday | Household | Laundry | Mom |
| 6:00 PM | Wednesday | Family | Homework | Child |

## System Explanation

**The visitor:** Selects a day, enters a time, category, task, and name, then clicks Add Task.

**The app:** Saves the task in Supabase, retrieves the updated list, and uses `map()` to display the scheduled tasks.

**The visitor sees:** The new task appear in the family schedule.

**While loading:** The app displays "Loading schedule..."

**If nothing matches:** The app displays "No tasks scheduled."

**If it fails:** The app displays "Unable to load or save tasks. Please try again."

## Reflection

Busy Mommie Planner is designed for busy parents who need help organizing their daily family responsibilities.

The first version will allow visitors to view, add, and delete scheduled tasks.

I decided to leave out notifications, user accounts, and photo uploads to keep the project manageable with the skills I have learned.

The hardest feature to leave out was photo uploads because I originally wanted families to personalize their welcome page.

The main interaction is adding a task. A visitor enters the task information and clicks Add Task. The app saves the information in Supabase and displays the updated schedule.

## Technologies Used

- React
- Vite
- JavaScript
- Supabase
- CSS
- GitHub
- Netlify

![Busy Mommie Planner Wireframe](wireframe.png)


## Team

We are a pod building our own apps.

### Pod Members

- Miaya Dennis — World Cultures
- Cindy Hulitsky — Dinosaurs
- Gbenga — Health Monitor
- Anastasia Ketchersid — Family Fun Planner
- Kevinika — Busy Mommie Planner

### Shared Pod Document

[Our Pod Capstone Plan]

(https://docs.google.com/document/d/1pAHUoA0O_Pil3cmCH792l70D3B6yPkERFIBjfPNTCwY/edit?tab=t.0)
