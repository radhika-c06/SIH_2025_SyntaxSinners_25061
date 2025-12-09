# 📖 Admin User Guide: Publishing Monasteries

## Welcome to the Monastery Management System! 👋

This guide will walk you through creating and publishing monasteries that become live on your website immediately.

---

## 🎯 What You'll Learn

- How to create a new monastery
- How to fill in all the information
- How to publish it live
- How to verify it's working
- How to make changes later

---

## 📋 Step 1: Navigate to Add New Monastery

**URL**: `https://yoursite.com/admin/monasteries/new`

**What you'll see**:
- Header: "Add New Monastery"
- Form on the left
- Preview panel on the right

---

## 📝 Step 2: Fill Basic Information

### Required Fields (marked with *)

#### Monastery Name *
```
Example: "Rumtek Monastery"
This will be displayed as the page title
```

#### Location *
```
Example: "Sikkim, India"
Where the monastery is located
```

#### Altitude
```
Example: "1600 meters"
How high above sea level
Leave blank if not applicable
```

#### Founded
```
Example: "1960"
Year or date the monastery was established
Can be just the year or full date
```

#### Short Description *
```
Example: "One of the most important Buddhist monasteries in India, 
known for its spiritual significance and architectural beauty."

This appears:
- On the public page
- In search results
- In monastery listings
```

---

## 🖼️ Step 3: Add Images

### Hero Image (Main Image)
```
Example: "/path/to/rumtek-main.jpg"

This is the large background image at the top of the page.
Use an absolute URL (starts with http:// or https://)

Best practices:
- High resolution (1920x1080 or larger)
- Beautiful, iconic view of monastery
- Clear and vibrant

Example URLs:
- "https://cdn.yoursite.com/rumtek/hero.jpg"
- "https://images.example.com/monasteries/rumtek.webp"
```

### Gallery Images
```
Multiple images that create a carousel on the page.

Click "Add Another Image" to add more.
Click "Remove" to delete an image.

Example URLs:
- "https://cdn.yoursite.com/rumtek/gallery-1.jpg"
- "https://cdn.yoursite.com/rumtek/gallery-2.jpg"
- "https://cdn.yoursite.com/rumtek/gallery-3.jpg"

Best practices:
- 3-5 images for best effect
- Mix of exterior and interior shots
- Consistent image quality
- Optimize file sizes (under 2MB each)
```

---

## 📚 Step 4: Add Content Sections

The form has multiple sections where you can add detailed content about the monastery.

### Available Sections

#### Overview
```
Brief introduction to the monastery.
Who it is, what it's known for, main features.

Example:
"Rumtek Monastery is one of the most important 
Buddhist monasteries in India, located in the 
state of Sikkim. It serves as the seat of the 
Karma Kagyu school of Tibetan Buddhism..."
```

#### History
```
The historical background and timeline.
When founded, important events, key figures.

Example:
"Founded in 1960, Rumtek Monastery was established 
as the seat of the 16th Karmapa in exile. 
It has since become a center for Buddhist 
learning and practice..."
```

#### Architecture
```
Describe the architectural style and features.
Design elements, structural significance.

Example:
"The monastery features traditional Tibetan Buddhist 
architecture with intricate woodwork, golden roofs, 
and elaborate paintings. The main structure contains..."
```

#### Rituals
```
Religious practices and ceremonies performed.
Festivals, daily practices, special events.

Example:
"The monastery conducts daily prayer sessions at 6 AM 
and 4 PM. Major celebrations include the Saga Dawa 
festival in May and..."
```

#### Best Visit Time
```
When visitors should come.
Best season, weather, special events.

Example:
"The best time to visit is from October to March 
when the weather is clear and pleasant. 
Avoid monsoon season (June-September)..."
```

#### Travel Info
```
How to get there, where to stay, practical information.

Example:
"The monastery is 24 km from Gangtok by road. 
You can hire a taxi or take a bus. 
Nearby accommodations include..."
```

#### Digital Archive
```
Information about historical documents and artifacts.
Describe the archive, its significance.
```

### Tips for Writing Content
- 💡 Be descriptive and engaging
- 💡 Use clear, readable language
- 💡 Break content into paragraphs
- 💡 Include interesting facts
- 💡 HTML formatting is supported
- 💡 Fill at least 2-3 sections for a complete page

---

## ✅ Step 5: Review the Preview

On the right side of the form, you'll see:
- **Monastery Name** (from form)
- **Location** (from form)
- **Status** dropdown showing "Draft"

The preview updates as you type!

---

## 🚀 Step 6: Publish the Monastery

### Change Status to Published

Click the **Status** dropdown (currently showing "Draft")
Select: **Published**

The dropdown should now show "Published"

---

## 🔍 Step 7: Save and Publish

### Click "Save Monastery"

The form will:
1. Validate all required fields
2. Send to AI verification system
3. Verify the information is accurate
4. Save to database if approved
5. Show confirmation message

**What happens next:**
- Your monastery is now LIVE ✅
- It's accessible at: `/all-monasteries/[monastery-slug]`
- The slug is auto-generated from the name

---

## 📱 Step 8: Verify It Works

### Check Your Live Monastery

The confirmation message will show the URL. 

Example: `https://yoursite.com/all-monasteries/rumtek-monastery`

**Click the link or visit it in your browser to:**
- See how it looks
- Verify all content displays correctly
- Check images load properly
- Test navigation buttons
- View on mobile device

---

## ❌ Troubleshooting: What if it Fails?

### Error: "Missing required fields"
**Solution**: 
- Make sure Name, Location, and Description are filled
- Check for any empty required fields (marked with *)

### Error: "AI verification rejected"
**Solution**:
- Check if information is accurate
- Fix any incorrect details
- Try publishing again
- Contact admin support if it persists

### Images not loading
**Solution**:
- Verify image URLs are correct
- Use absolute URLs (start with http or https)
- Check if the image host is accessible
- Try a different image URL

### URL doesn't work after publishing
**Solution**:
- Wait 1-2 minutes for database to update
- Refresh the page
- Check that status is "Published" (not Draft)
- Check MongoDB connection logs

---

## 🛠️ Step 9: Edit Existing Monastery

### Make Changes After Publishing

Go to: `/admin/monasteries`

1. Find your monastery in the list
2. Click "Edit"
3. Make changes to any fields
4. Save
5. Changes appear immediately on public page

**You can change:**
- Any text content
- Images (add, remove, replace)
- Sections (add, modify, delete)
- Even change published status to Draft

---

## 📊 Step 10: Monitor Published Monasteries

### View All Monasteries

Go to: `/admin/monasteries`

You'll see:
- List of all monasteries (published and draft)
- Status badge (Published/Draft)
- Created date
- Edit button
- Delete button

### Status Indicators
- 🟢 **Published** - Visible to public
- 🟡 **Draft** - Only visible to admins

---

## 🎨 Best Practices for Great Pages

### Content
✅ **DO**:
- Write engaging descriptions
- Include accurate historical information
- Add multiple images (3-5+)
- Fill multiple content sections
- Use proper formatting
- Verify spelling and grammar

❌ **DON'T**:
- Copy content from random sources
- Leave sections empty
- Use low-quality images
- Add misleading information
- Use broken image links

### Images
✅ **DO**:
- Use high-quality images (1920x1080+)
- Include variety (exterior, interior, people, details)
- Optimize file sizes
- Use reliable hosting services
- Test that images load

❌ **DON'T**:
- Use blurry or low-res images
- Use relative paths (e.g., "/image.jpg")
- Link to third-party sites that might be down
- Use images without proper rights/permissions

### Structure
✅ **DO**:
- Start with Overview section
- Follow with History
- Add Architecture details
- Include practical info (visiting times, location)
- Add 2-3 more sections

❌ **DON'T**:
- Leave important info in only one section
- Make text too dense/hard to read
- Use inconsistent formatting

---

## 🔐 Important Security Notes

### Your Admin Access
- Keep your login credentials private
- Don't share your admin link
- Use strong passwords
- Log out after use

### Monastery Data
- All published data is public
- Double-check information before publishing
- Verify image sources and rights
- Respect copyright and permissions

---

## ❓ FAQ

### Q: How long until a monastery appears?
**A**: Immediately after publishing! It goes live right away.

### Q: Can I change it after publishing?
**A**: Yes! Go to `/admin/monasteries`, click edit, make changes, and save.

### Q: Can I unpublish it?
**A**: Yes! Change status from "Published" to "Draft" and it becomes private.

### Q: Where does it appear online?
**A**: At the URL: `/all-monasteries/[monastery-name]`

### Q: Can I delete it?
**A**: Yes! But it will be gone completely. Consider using Draft status instead.

### Q: Do I need to create the page files?
**A**: No! Everything is automatic. The system creates the page dynamically.

### Q: How many monasteries can I create?
**A**: Unlimited! Create as many as you want.

### Q: Can I have multiple people managing monasteries?
**A**: Yes! All admins can create and edit monasteries.

### Q: What if I make a typo?
**A**: No problem! Edit the monastery and save again. Changes appear immediately.

### Q: Can visitors edit the monasteries?
**A**: No! Only authenticated admins can edit. Visitors can only view.

---

## 📞 Support

If you encounter issues:

1. **Check this guide** first
2. **Review error messages** carefully
3. **Try refreshing** the page
4. **Clear browser cache** (Ctrl+Shift+Delete)
5. **Contact admin** if problem persists

---

## 🎓 Learning Resources

- **Detailed Workflow**: `PUBLISHED_MONASTERY_WORKFLOW.md`
- **Technical Details**: `IMPLEMENTATION_SUMMARY.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **Architecture**: `ARCHITECTURE_DIAGRAM.md`

---

## ✨ Congratulations!

You now know how to:
✅ Create beautiful monastery pages
✅ Publish them live instantly
✅ Edit and update anytime
✅ Manage multiple monasteries

**Happy publishing! 🏛️**

---

## Quick Checklist for New Monastery

Before clicking "Save as Published", verify:

- [ ] Monastery Name filled (required)
- [ ] Location filled (required)
- [ ] Short Description filled (required)
- [ ] Hero image URL provided
- [ ] Hero image works (test the URL)
- [ ] At least 1-2 gallery images added
- [ ] Gallery images work
- [ ] At least 2-3 content sections filled
- [ ] Content is accurate and well-written
- [ ] Status is set to "Published"
- [ ] Spell-checked and formatted

**Once checked, click "Save as Published"** ✅

---

**Happy managing! Your monastery pages await!** 🚀
