# Simulated Career Kaki - Staging Environment

A simulated staging/QA testing version of a career guidance chatbot website with hardcoded responses for consistent testing.

## 🎯 Purpose

This is a **staging environment** designed for QA testing purposes. All bot responses are hardcoded to ensure consistent, predictable behavior during testing cycles.

## ✨ Features

- **AI Career Assistant Chat Interface** - Chat with a bot that provides career guidance
- **Hardcoded Responses** - All responses are predefined for consistent QA testing
- **Quick Action Buttons** - Fast access to common queries
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Clean UI** - Professional, modern interface inspired by Career Kaki
- **Health Check Endpoint** - API endpoint for monitoring application status
- **Single Page Design** - Optimized to fit on one screen without scrolling

## 📋 Bot Response

The bot provides a single, consistent response to all messages notifying users that the chatbot service is permanently down and directing them to the main website at `http://116.99.49.161/` , this is just some arbitrary url.

## 🚀 Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /mnt/c/users/chinc/development/Websites/career-kaki-staging
   ```

2. **Create a virtual environment (recommended):**
   ```powershell
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   
   **On Linux/Mac:**
   ```bash
   source venv/bin/activate
   ```
   
   **On Windows:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

4. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Flask server:**
   ```bash
   python3 app.py
   ```

2. **Access the application:**
   - Open your browser and navigate to: `http://localhost:8080`
   - The application will be running on your local machine

3. **Stop the server:**
   - Press `Ctrl+C` in the terminal

## 🧪 Testing Guide for QA

### Test Scenarios

#### 1. Basic Chat Functionality
- **Test**: Send a message in the chat
- **Expected**: Bot responds with the permanent down notice
- **Test Messages**:
  - "Tell me about job opportunities"
  - "What courses should I take?"
  - "How do I prepare for an interview?"
  - "Help me with my resume"

#### 2. Quick Action Buttons
- **Test**: Click each quick action button (Job Search, Course Search, Interview Guide, Resume Preparation)
- **Expected**: Message is populated and bot responds with the permanent down notice

#### 3. Response Testing
- **Test**: Send any message
- **Expected**: Bot always replies with the permanent down notice directing users to the main website

#### 4. UI/UX Testing
- Test responsiveness on different screen sizes
- Verify chat scrolls to bottom on new messages
- Check typing indicator appears and disappears
- Test clear chat functionality (keeps welcome message)
- Verify all navigation links work (Home, Privacy, Terms)
- Confirm page fits on one screen without scrolling

#### 5. API Endpoints

**Health Check:**
```bash
curl http://localhost:8080/api/health
```
Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-10T...",
  "version": "1.0.0-staging"
}
```

**Chat API:**
```bash
curl -X POST http://localhost:8080/api/chat -H "Content-Type: application/json" -d '{"message": "job search"}'
```

### Browser Console Testing

Open browser console (F12) and run:
```javascript
checkHealth()  // Checks application health
```

The console also logs:
- Application version
- Load timestamp
- Staging environment notice

## 📁 Project Structure

```
career-kaki-staging/
├── app.py                  # Main Flask application (port 8080)
├── requirements.txt        # Python dependencies (Flask 3.0.0, Werkzeug 3.0.1)
├── README.md              # This file
├── static/
│   ├── css/
│   │   └── style.css     # Application styles (compact single-page design)
│   └── js/
│       └── main.js       # Client-side JavaScript
└── templates/
    ├── index.html        # Main chat interface
    ├── privacy.html      # Privacy policy page
    └── terms.html        # Terms of use page
```

## 🔧 Configuration

### Staging Response

To modify the staging response, edit the `STAGING_RESPONSE` variable in `app.py`:

```python
STAGING_RESPONSE = """< Must Comply According To The Law>
⚠️ CHATBOT IS permanently DOWN ⚠️
This chatbot service is permanently down.

Please navigate to the main website to continous testing:
👉 http://116.99.49.161/

The fully functional chatbot is available there."""
```

### Port Configuration

To change the port, modify the last line in `app.py`:

```python
app.run(debug=True, host='0.0.0.0', port=8080)  # Change port here (default: 8080)
```

## 🐛 Known Limitations

- Bot only returns a single staging message
- No real AI integration
- No database or data persistence
- No user authentication
- No real job or course data
- Chat history is not saved between sessions
- Info cards section is hidden (CSS: `display: none`)
- Chat messages area limited to 250px height for single-page design

## 📝 QA Testing Checklist

- [ ] Application starts without errors on port 8080
- [ ] Homepage loads correctly
- [ ] Chat interface displays properly
- [ ] All quick action buttons work (4 buttons)
- [ ] Bot responds with permanent down notice
- [ ] Typing indicator appears/disappears correctly
- [ ] Clear chat functionality works (keeps welcome message)
- [ ] All navigation links work (Home, Privacy, Terms)
- [ ] Privacy and Terms pages load correctly
- [ ] Health check endpoint responds at `/api/health`
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Same response for all messages
- [ ] Page fits on one screen without scrolling
- [ ] STAGING badge displays in header

## 🔒 Security Note

This is a **staging environment only**. Do not:
- Enter real personal information
- Use in production
- Store sensitive data
- Share outside the QA team

## 📞 Support

For issues or questions about this staging environment, contact the development team.

## 📄 License

This staging environment is for internal QA testing purposes only.

---

**Version:** 1.0.0-staging  
**Last Updated:** November 17, 2025  
**Status:** Ready for QA Testing  
**Port:** 8080  
**Main Website:** http://116.99.49.161/
