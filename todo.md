# Photo Gallery Project Plan

- [ ] **Step 1: Asset Discovery:** Locate all JPG images within the `t1`, `t2`, and `t3` directories.
- [ ] **Step 2: Data Mapping:**
    - [ ] Create a JSON structure containing all discovered images.
    - [ ] For each image, define relative paths for the original file, a future `small` version, and a future `thumbnail` version.
    - [ ] Assign the filename as the default title.
- [ ] **Step 3: Theming and Branding:**
    - [ ] Modify `index.html` to replace the hardcoded CSS theme colors with the brand colors specified in `readme.md`.
    - [ ] Replace the text-based logo in `index.html` with the `logo.svg`.
- [ ] **Step 4: Content Integration:**
    - [ ] Replace the sample photo data in `index.html` with the newly generated JSON map.
    - [ ] Update the lightbox to use the `small` image path for viewing.
    - [ ] Update the download button to use the `original` high-resolution image path.
- [ ] **Step 5: Final Review:**
    - [ ] Verify that the gallery loads and displays the image placeholders correctly.
    - [ ] Confirm that the new theme and logo are applied.
    - [ ] Document the need for an external script/process to generate the actual thumbnail and small image files.