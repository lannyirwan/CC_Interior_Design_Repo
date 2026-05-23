# Claude Code posthook: fired after a successful enquiry form submission response.
# Uses Windows built-in TTS to announce the success locally.

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate  = -1   # slightly slower for clarity
$synth.Volume = 100
$synth.Speak("HURRAY! Your form is submitted successfully.")
