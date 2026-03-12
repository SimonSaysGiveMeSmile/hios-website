# HiOS Agent Tool Reference
**Generated**: 2026-03-10
**Version**: 1.0
**Total Tools**: 13 (5 Native + 8 Browser)

---

## Overview

This document provides the complete specification of all tools available to the HiOS agent. All tools conform to the universal `Tool` protocol and can be used by the LLM planner for task execution.

### Tool Protocol

All tools implement the following interface:

```swift
protocol Tool {
    var name: String           // Unique identifier
    var description: String    // Human-readable description
    var category: ToolCategory // Organization category
    var inputSchema: [String: ToolParameter]  // Parameter definitions
    func execute(params: [String: Any]) async throws -> ToolResult
}
```

### Tool Categories

| Category | Description |
|----------|-------------|
| **Browser** | Web automation via WKWebView |
| **Calendar** | EventKit event management |
| **Reminders** | EventKit task management |
| **Photos** | PhotosKit camera roll access |
| **OCR** | Vision framework text extraction |
| **Contacts** | Contacts framework search |

### Tool Result Types

All tools return `ToolResult` which can be:
- `.success(data:)` - Operation completed successfully
- `.failure(error:)` - Operation failed with error info
- `.needsConfirmation(action:)` - Requires user confirmation
- `.partialSuccess(completed:, failed:)` - Partial completion

---

## Native iOS Tools

### 1. Calendar Tool

| Property | Value |
|----------|-------|
| **Name** | `calendar_create_event` |
| **Description** | Create a calendar event with title, date, and optional location |
| **Category** | Calendar |
| **Framework** | EventKit |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Event title |
| `start_date` | string | Yes | Start date/time (ISO 8601 format) |
| `end_date` | string | No | End date/time (ISO 8601 format) |
| `location` | string | No | Event location |
| `notes` | string | No | Event notes |

**Returns:**
```json
{ "event_id": "string", "title": "string", "start": "string" }
```

**Permissions**: Calendar access required (iOS will prompt)

**Example:**
```json
{
  "name": "calendar_create_event",
  "params": {
    "title": "Team Meeting",
    "start_date": "2026-03-15T14:00:00Z",
    "end_date": "2026-03-15T15:00:00Z",
    "location": "Conference Room A"
  }
}
```

---

### 2. Reminders Tool

| Property | Value |
|----------|-------|
| **Name** | `reminders_create` |
| **Description** | Create a reminder/task with title and optional due date |
| **Category** | Reminders |
| **Framework** | EventKit |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Reminder title |
| `due_date` | string | No | Due date (ISO 8601 format) |
| `notes` | string | No | Reminder notes |
| `priority` | number | No | Priority (0=none, 1=high, 5=medium, 9=low) |

**Returns:**
```json
{ "reminder_id": "string", "title": "string" }
```

**Permissions**: Reminders access required (iOS will prompt)

**Example:**
```json
{
  "name": "reminders_create",
  "params": {
    "title": "Buy groceries",
    "due_date": "2026-03-12T18:00:00Z",
    "priority": 5
  }
}
```

---

### 3. Photos Tool

| Property | Value |
|----------|-------|
| **Name** | `photos_get_latest` |
| **Description** | Get the latest photo(s) from the camera roll |
| **Category** | Photos |
| **Framework** | PhotosKit |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `count` | number | No | Number of photos to retrieve (default: 1) |

**Returns:**
```json
{
  "photos": [
    { "id": "string", "creation_date": "string", "width": number, "height": number }
  ],
  "count": number
}
```

**Permissions**: Photos access required (iOS will prompt)

**Example:**
```json
{
  "name": "photos_get_latest",
  "params": { "count": 5 }
}
```

---

### 4. OCR Tool

| Property | Value |
|----------|-------|
| **Name** | `ocr_extract_text` |
| **Description** | Extract text from an image using OCR |
| **Category** | OCR |
| **Framework** | Vision |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image_path` | string | Yes | Path to image file or base64 encoded image |
| `language` | string | No | Language code (e.g., 'en-US'), default: "en-US" |

**Returns:**
```json
{ "text": "string", "length": number }
```

**Permissions**: None (local processing)

**Example:**
```json
{
  "name": "ocr_extract_text",
  "params": {
    "image_path": "/path/to/image.jpg",
    "language": "en-US"
  }
}
```

---

### 5. Contacts Tool

| Property | Value |
|----------|-------|
| **Name** | `contacts_search` |
| **Description** | Search for a contact by name |
| **Category** | Contacts |
| **Framework** | Contacts |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Contact name to search for |

**Returns:**
```json
{
  "contacts": [
    { "id": "string", "name": "string", "phones": [], "emails": [] }
  ],
  "count": number
}
```

**Permissions**: Contacts access required (iOS will prompt)

**Example:**
```json
{
  "name": "contacts_search",
  "params": { "name": "John Doe" }
}
```

---

## Browser Tools

### 6. Browser Open Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_open` |
| **Description** | Navigate to a URL in the browser |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The URL to navigate to |

**Returns:**
```json
{ "url": "string" }
```

**Example:**
```json
{
  "name": "browser_open",
  "params": { "url": "https://amazon.com" }
}
```

---

### 7. Browser Click Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_click` |
| **Description** | Click an element by CSS selector |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selector` | string | Yes | CSS selector for the element to click |

**Returns:**
```json
{ "selector": "string" }
```

**Example:**
```json
{
  "name": "browser_click",
  "params": { "selector": "#submit-button" }
}
```

---

### 8. Browser Click Text Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_click_text` |
| **Description** | Click an element by its visible text content |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The visible text to search for and click |
| `exact` | boolean | No | Whether to match text exactly (default: false) |

**Returns:**
```json
{ "text": "string", "exact": boolean }
```

**Example:**
```json
{
  "name": "browser_click_text",
  "params": { "text": "Continue", "exact": false }
}
```

---

### 9. Browser Type Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_type` |
| **Description** | Type text into an input field by CSS selector |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selector` | string | Yes | CSS selector for the input field |
| `text` | string | Yes | Text to type into the field |
| `clear` | boolean | No | Clear existing text before typing (default: true) |

**Returns:**
```json
{ "selector": "string", "text": "string" }
```

**Example:**
```json
{
  "name": "browser_type",
  "params": { "selector": "#search-input", "text": "batteries", "clear": true }
}
```

---

### 10. Browser Fill Input Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_fill_input` |
| **Description** | Fill an input field by finding it via its label text |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | string | Yes | The label text to search for |
| `value` | string | Yes | The value to fill into the input |

**Returns:**
```json
{ "label": "string", "value": "string" }
```

**Example:**
```json
{
  "name": "browser_fill_input",
  "params": { "label": "Email", "value": "user@example.com" }
}
```

---

### 11. Browser Extract Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_extract` |
| **Description** | Extract text or data from the page using CSS selectors |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selector` | string | Yes | CSS selector for elements to extract |
| `attribute` | string | No | Optional attribute to extract (default: textContent) |
| `multiple` | boolean | No | Extract all matching elements (default: false) |

**Returns:**
```json
{ "selector": "string", "data": "string" }
```

**Example:**
```json
{
  "name": "browser_extract",
  "params": { "selector": ".product-price", "multiple": true }
}
```

---

### 12. Browser Scroll Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_scroll` |
| **Description** | Scroll the page in a direction |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `direction` | string | Yes | Direction: 'up', 'down', 'top', 'bottom' |
| `amount` | number | No | Amount to scroll in pixels (default: 500) |

**Returns:**
```json
{ "direction": "string", "amount": number }
```

**Example:**
```json
{
  "name": "browser_scroll",
  "params": { "direction": "down", "amount": 500 }
}
```

---

### 13. Browser Wait Tool

| Property | Value |
|----------|-------|
| **Name** | `browser_wait` |
| **Description** | Wait for an element to appear or a condition to be met |
| **Category** | Browser |

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selector` | string | No | CSS selector to wait for |
| `timeout` | number | No | Maximum time to wait in seconds (default: 10) |

**Returns:**
```json
{ "selector": "string", "found": boolean }
// or
{ "waited": number }
```

**Example:**
```json
{
  "name": "browser_wait",
  "params": { "selector": "#loading-complete", "timeout": 15 }
}
```

---

## Tool Summary

| # | Category | Tool Name | Description |
|---|----------|-----------|-------------|
| 1 | Native | `calendar_create_event` | Create calendar events |
| 2 | Native | `reminders_create` | Create reminders/tasks |
| 3 | Native | `photos_get_latest` | Access camera roll photos |
| 4 | Native | `ocr_extract_text` | Extract text from images |
| 5 | Native | `contacts_search` | Search device contacts |
| 6 | Browser | `browser_open` | Navigate to URL |
| 7 | Browser | `browser_click` | Click by CSS selector |
| 8 | Browser | `browser_click_text` | Click by text content |
| 9 | Browser | `browser_type` | Type into input field |
| 10 | Browser | `browser_fill_input` | Fill input by label |
| 11 | Browser | `browser_extract` | Extract page data |
| 12 | Browser | `browser_scroll` | Scroll page |
| 13 | Browser | `browser_wait` | Wait for element |

### Quick Reference

```
+-----------------------------------------------------------------------------+
|                           TOOL INVENTORY                                    |
+---------------+------------------------------------------------------------+
|   Native     |  calendar_create_event, reminders_create, photos_get_latest,  |
|   (5 tools)  |  ocr_extract_text, contacts_search                            |
+---------------+------------------------------------------------------------+
|   Browser    |  browser_open, browser_click, browser_click_text,            |
|   (8 tools)  |  browser_type, browser_fill_input, browser_extract,          |
|              |  browser_scroll, browser_wait                                 |
+---------------+------------------------------------------------------------+
|   TOTAL      |  13 tools                                                    |
+---------------+------------------------------------------------------------+
```

---

## Usage in LLM Planning

When the LLM plans a task, it receives the full tool specifications and can generate tool calls like:

```json
{
  "tool": "calendar_create_event",
  "params": {
    "title": "Dentist appointment",
    "start_date": "2026-03-20T10:00:00Z"
  }
}
```

The agent will automatically:
1. Validate parameters against the tool's input schema
2. Request necessary permissions (first time only)
3. Execute the tool and return results
4. Handle errors with appropriate recovery strategies

---

**Generated by**: Claude Opus 4.6
**Project**: HiOS - Universal Tool Bus for iOS
**Date**: 2026-03-10
