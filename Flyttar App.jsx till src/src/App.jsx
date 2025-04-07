import { useState } from 'react';

const questions = [
  "Vilka egenskaper skulle du säga beskriver dig bäst?",
  "Vilka färdigheter har du – praktiska eller teoretiska?",
  "Vad har du för arbetsintressen?",
  "Vad har du för fritidsintressen?",
  "Vilka tidigare arbetslivserfarenheter har du?",
  "Vilka utbildningar har du gått – formella eller informella?",
  "Vad värderar du i arbetslivet?",
  "Hur skulle du beskriva ditt hälsoläge och välmående just nu?",
  "Vad har du för mål eller drömmar kopplat till yrkesliv eller studier?",
  "Hur ser du på dina kompetenser i relation till EU:s nyckelkompetenser?"
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [completed, setCompleted] = useState(false);

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const generateSuggestions = () => {
    return [
      'Studie- och yrkesvägledare',
      'HR-specialist',
      'Coach inom arbetsliv och karriär',
      'Utbildningssamordnare',
      'Socialpedagog',
      'Arbeta inom kommunal vuxenutbildning',
      'Arbetsmarknadsprojekt eller vägledningscenter'
    ];
  };

  const downloadProfile = () => {
    const content = questions.map((q, i) => `${q}\n${answers[i]}\n`).join('\n');
    const suggestions = generateSuggestions().join('\n- ');
    const fullContent = `${content}\n\nFöreslagna yrken/branscher:\n- ${suggestions}`;
    const blob = new Blob([fullContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Karriarprofil.pdf';
    link.click();
  };

  if (completed) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Din karriärprofil är klar!</h2>
        <p>Här är några yrken eller områden som kan passa dig:</p>
        <ul>
          {generateSuggestions().map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        <button onClick={downloadProfile}>Ladda ner som PDF</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Karriärprofilen</h1>
      <p>Välkommen! Svara på frågorna nedan för att skapa din karriärprofil. När du är klar får du förslag på yrken och kan ladda ner en PDF.</p>
      <h2>{questions[step]}</h2>
      <textarea
        rows={5}
        value={answers[step]}
        onChange={handleAnswerChange}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={nextStep}>Nästa</button>
    </div>
  );
}

export default App;
