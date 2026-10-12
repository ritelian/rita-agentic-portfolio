# From reading code to explaining a decision

Illustrative beginner lab by Rita Martins. Fictional data; not client course code.

## Prerequisites
Variables, lists and dictionaries. Use Python 3 locally. No packages required.

## Objective
Given a list of learner dictionaries, use a loop and condition to identify incomplete records, returning the correct names and explaining how the selection works.

## Read — 5 minutes
Open python-learning-lab.py. Predict the printed number without executing the code. Which condition determines whether a record counts?

## Try — 5 minutes
Run `python3 python-learning-lab.py`. It should print 2. Change Sam's completion value to True; predict and verify the result (3).

## Explain — 5 minutes
Describe why `completed += 1` is inside the condition and why the loop visits every record.

## Transfer — 10 minutes
Restore the original data. Write `pending_names(records)` to return names whose completion value is False. Expected result: `["Sam"]`. With an empty input list, return `[]`. Explain the condition in your own words.

## Feedback criteria
- Selects incomplete records, rather than complete ones.
- Returns names in a list; no unwanted output inside the function.
- Handles an empty list.
- Explains how the condition and iteration work together.

If you struggle, trace one record at a time on paper before changing the code. Use the first record as a worked example, then try the remaining records independently.
