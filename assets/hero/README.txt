HOMEPAGE HERO FOOTAGE
=====================

Drop two files in this folder and the homepage hero panel picks them up
automatically. No code changes needed.

  hero.mp4          the looping footage
  hero-poster.jpg   first frame, shown while the video loads

If neither file is here, the panel falls back to its light background plus the
coverage-network animation. It looks intentional, but it is not footage — the
right-hand side of the panel will read as sparse until a clip goes in.


>>> THE PANEL IS WHITE. THE FOOTAGE MUST BE BRIGHT. <<<

This is the one thing that will make or break the clip. The hero line is dark
ink on a near-white scrim. A dark-graded clip (most fluorescence microscopy,
most "moody lab at night" footage) will fight that text and look wrong.

Pick clips that are: high-key, bright, white/pale, softly lit. Think white lab
bench, daylight, pale glassware, clean whites. Low contrast is good — the
footage is a backdrop, not the subject.


WHAT TO LOOK FOR
----------------
  - microscope close-ups, slides, pipetting, sample trays
  - clean glassware, centrifuge work, bright lab benches
  - molecular / protein structures on a pale background

AVOID: city skylines, glass office towers, trading floors, handshakes,
scrolling tickers. That footage is the most reused in finance web design and
will make the page look cheaper, not more expensive. It also says nothing
about research or biotech.

Also avoid anything busy in the LEFT HALF of the frame — that is where the
hero line sits. Keep the movement on the right.


CANDIDATE CLIPS (Pexels)
------------------------
Licence checked 2026-08-27: free for commercial use, no attribution required.
Two restrictions that matter for a company site: you may not imply that people
shown endorse Sedge, and it cannot be used as part of a trademark or logo.

Because of the endorsement restriction, clips with NO identifiable faces are
the safer pick for a homepage hero:

  Close-up shot of a microscope
  https://www.pexels.com/video/close-up-shot-of-a-microscope-9244192/

  Lab laboratory medical medicine
  https://www.pexels.com/video/lab-laboratory-medical-medicine-4121129/

These have people in frame — usable, but check the endorsement point:

  Female scientist using a microscope
  https://www.pexels.com/video/female-scientist-using-a-microscope-12866100/

  A person using a microscope
  https://www.pexels.com/video/a-person-using-a-microscope-6130312/

  A man using microscope
  https://www.pexels.com/video/a-man-using-microscope-8771135/

NOTE: these were found by title and licence, not watched. Nobody has checked
how bright each one actually is — preview them and pick on brightness first.

Other sources: coverr.co, mixkit.co (free); artgrid.io, stock.adobe.com (paid).


SPECS
-----
  format      H.264 MP4
  resolution  1920x1080 is plenty; 1280x720 is fine
  length      8-15 seconds, loops cleanly (no hard cut at the end)
  size        keep under ~5 MB, ideally 2-3 MB
  audio       strip it entirely — the video is muted and autoplaying

Compress before committing:

  ffmpeg -i source.mp4 -t 12 -an -vf "scale=1920:-2" \
         -c:v libx264 -crf 30 -preset slow -movflags +faststart hero.mp4

  ffmpeg -i hero.mp4 -vframes 1 -q:v 3 hero-poster.jpg

If the clip is too dark once it is in, raise the scrim opacity in index.html
(the gradient just above the hero text) rather than re-grading the video.
