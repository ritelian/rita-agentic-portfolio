'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
if (menu && nav) {
  menu.hidden = false;
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu +'; };
  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close −' : 'Menu +';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById('workflow-form');
if (form) {
  const output = document.getElementById('demo-output');
  const status = document.getElementById('demo-status');
  const approve = document.getElementById('approve-sample');
  const acceptedActions = document.getElementById('accepted-actions');
  const checks = [...document.querySelectorAll('input[name="qa"]')];
  const reviewStage = document.getElementById('stage-review');
  const objective = document.getElementById('objective');
  let sample = null;
  let accepted = false;
  function invalidate() {
    if (!sample) return;
    sample = null; accepted = false; output.hidden = true; acceptedActions.hidden = true;
    checks.forEach(check => { check.checked = false; }); approve.disabled = true;
    status.textContent = 'Brief changed. Build a new sample before reviewing it.';
  }
  form.addEventListener('input', invalidate);
  form.addEventListener('change', invalidate);
  objective.addEventListener('input', () => objective.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!objective.value.trim()) { objective.setCustomValidity('Enter a learning objective.'); objective.reportValidity(); return; }
    objective.setCustomValidity('');
    const duration = Number(document.getElementById('duration').value);
    const plans = {30:[5,5,15,5],45:[5,10,20,10],60:[10,10,25,15]};
    const labels = ['Frame the task and surface assumptions','Model source-to-summary verification','Practise: annotate and rewrite the fictional summary','Assess: justify the revision against the criteria'];
    sample = {audience:document.getElementById('audience').value,duration,objective:objective.value.trim(),plan:labels.map((label,i) => `${plans[duration][i]} min — ${label}`)};
    accepted = false; acceptedActions.hidden = true; checks.forEach(check => {check.checked = false;}); approve.disabled = true;
    document.getElementById('output-title').textContent = 'Review before you share';
    document.getElementById('output-summary').textContent = `${sample.audience} · ${duration}-minute session`;
    document.getElementById('output-objective').textContent = sample.objective;
    const list = document.getElementById('output-plan'); list.replaceChildren();
    sample.plan.forEach(item => {const li = document.createElement('li');li.textContent = item;list.append(li);});
    document.getElementById('stage-brief').className='done';
    document.getElementById('stage-draft').className='done';
    reviewStage.className='current'; reviewStage.textContent='03 / Awaiting review';
    output.hidden=false;
    status.textContent='Sample drafted from a local template. Inspect the objective, activity and criteria before accepting.';
    const title = document.getElementById('output-title'); title.tabIndex=-1; title.focus({preventScroll:true});
    output.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  checks.forEach(check => check.addEventListener('change', () => {
    accepted=false; acceptedActions.hidden=true;
    approve.disabled = !checks.every(item => item.checked);
    reviewStage.className='current';reviewStage.textContent='03 / Awaiting review';
    status.textContent = approve.disabled ? 'Review in progress. Inspect all three criteria before accepting.' : 'All review criteria acknowledged. You can now accept the sample or revise the brief.';
  }));
  approve.addEventListener('click', () => {
    if (!sample || !checks.every(check => check.checked)) return;
    accepted=true;acceptedActions.hidden=false;reviewStage.className='done';reviewStage.textContent='03 / Sample accepted';
    status.textContent='Sample accepted in this demonstration. Download or print it for further editing. Nothing has been published.';
  });
  document.getElementById('revise-sample').addEventListener('click', () => { invalidate();objective.focus();form.scrollIntoView({block:'start'}); });
  document.getElementById('download-sample').addEventListener('click', () => {
    if (!accepted || !sample) return;
    const text = `# Review before you share\n\nFictional demonstration by Rita Martins. Created using local templates, not live AI.\nHuman review was acknowledged in a browser simulation; this is not evidence of a delivered or validated course.\n\n## Brief\nAudience: ${sample.audience}\nDuration: ${sample.duration} minutes\nObjective: ${sample.objective}\n\n## Session plan\n${sample.plan.map(item=>'- '+item).join('\n')}\n\n## Fictional source note\nThe team discussed a pilot. A decision will follow a review next week. No budget or launch date was approved.\n\n## Deliberately flawed summary\nThe team approved the pilot and its budget. The launch will take place next week.\n\n## Practice\nIdentify unsupported claims, rewrite the summary and explain the changes.\nThis fixed activity must be checked for alignment if the learning objective changes.\n\n## Assessment criteria\n- Identifies unsupported approval, budget and launch claims.\n- Rewrites without adding information.\n- Explains why verification is needed before sharing.\n\n## Human review acknowledged\n${checks.map(check=>'- [x] '+check.parentElement.textContent.trim()).join('\n')}\n\n## Follow-up evaluation (proposed)\nUse a new example to assess whether the verification method transfers. No learner outcomes have been measured.\n`;
    const url = URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='rita-martins-illustrative-learning-package.md';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('print-sample').addEventListener('click', () => {if (accepted) {document.body.classList.add('print-sample');window.print();}});
  window.addEventListener('afterprint',()=>document.body.classList.remove('print-sample'));
}
