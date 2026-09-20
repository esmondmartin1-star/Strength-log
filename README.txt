STRENGTH LOG - standalone app
=============================

Files (keep them together, with the icons folder):
  index.html, sw.js, manifest.webmanifest, icons/

1. HOST IT  (needs an https address; free options)
   - Netlify Drop: drag this whole folder onto the Netlify Drop page.
     Create a free account so the site stays up.
   - Cloudflare Pages: Create project > Direct Upload > upload this folder.
   - GitHub Pages: put these files in a repository, then Settings > Pages.
   Any static web host works. Do NOT upload your data backup file.

2. INSTALL ON YOUR PHONE
   Open your link once with a connection, then:
   - iPhone or iPad: Safari > Share > Add to Home Screen.
   - Android: Chrome menu > Install app.
   After that it opens from the home screen and works with no signal.

3. MOVE YOUR DATA IN
   Open the app > Plan > "Restore from a backup file" and choose
   my-strength-log-data.json, or a backup exported from the Claude version
   (Plan > Full backup file).

4. KEEP IT SAFE
   Your log lives on the device only. The app reminds you weekly to save a
   backup file. Keep those files somewhere safe (cloud drive, email to self).

5. UPDATING
   When you receive a new index.html, also change VERSION in sw.js
   (for example 1.0.0 to 1.0.1) and upload the files again. Close and
   reopen the app once or twice to load the new version.

TESTING ON A COMPUTER
   Run  python3 -m http.server  inside this folder and open
   http://localhost:8000 (service workers need https or localhost).
