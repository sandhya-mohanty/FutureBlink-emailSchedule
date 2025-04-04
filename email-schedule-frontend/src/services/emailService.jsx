import { authService } from './authService';
const API_URL = 'https://future-blink-email-schedule-api.vercel.app';

export const emailService = {
  async scheduleEmail(email, subject, body, leadSource = null, waitDelay = null) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('User not authenticated');
    }

    const requestBody = { 
      email: String(email), 
      subject: String(subject), 
      body: String(body),
      leadSource: leadSource || null,  
      waitDelay: waitDelay ? { 
        value: waitDelay.value ? Number(waitDelay.value) : 1,
        unit: waitDelay.unit ? String(waitDelay.unit) : 'Days'
      } : null  
    };
    
    // Convert to JSON manually with replacer function
    const jsonBody = JSON.stringify(requestBody, (key, value) => {
      
      return value === undefined ? null : value;
    });
    

    
    const response = await fetch(`${API_URL}/email/schedule-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: jsonBody,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to schedule email');
    }
    
    return await response.json();
  }
};

