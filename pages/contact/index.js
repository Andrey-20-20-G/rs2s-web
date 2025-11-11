import { useState } from 'react';
import Circles from '/components/Circles';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import emailjs from '@emailjs/browser';

// Ваши ключи из EmailJS панели
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_e4f3d4g', // Замените на ваш Service ID
  TEMPLATE_ID: 'template_q3lu86g', // Замените на ваш Template ID
  PUBLIC_KEY: '-p8cxA5RBiua3y4jz' // Замените на ваш Public Key
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    // Валидация
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setStatusMessage('Message sent successfully! 🎉');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      
      let errorMessage = 'Error sending message. Please try again.';
      
      if (error.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error.status) {
        switch (error.status) {
          case 400:
            errorMessage = 'Invalid form data. Please check your inputs.';
            break;
          case 401:
            errorMessage = 'Email service not authorized. Please contact support.';
            break;
          case 403:
            errorMessage = 'Email service forbidden. Please check your configuration.';
            break;
          default:
            errorMessage = `Error ${error.status}: Failed to send message.`;
        }
      }
      
      setStatusMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-full bg-primary/30'>
      <div className='container mx-auto py-32 text-center xl:text-left 
        flex items-center justify-center h-full'>
          <div className='flex flex-col w-full max-w-[700px]'>
            <motion.h2 
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 text-center mb-12'>
              Let's <span className='text-accent'>connect.</span>
            </motion.h2>
            
            {/* Status Message */}
            {statusMessage && (
              <motion.div 
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className={`mb-6 p-4 rounded-lg text-center ${
                  statusMessage.includes('Error') || statusMessage.includes('Please')
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                {statusMessage}
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='flex-1 flex flex-col gap-6 w-full mx-auto'>
              
              <div className='flex gap-x-6 w-full'>
                <input 
                  type='text' 
                  name='name'
                  placeholder='Your Name' 
                  className='input'
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <input 
                  type='email' 
                  name='email'
                  placeholder='Your Email' 
                  className='input'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <input 
                type='text' 
                name='subject'
                placeholder='Subject' 
                className='input'
                value={formData.subject}
                onChange={handleChange}
                disabled={isLoading}
              />
              
              <textarea 
                name='message'
                placeholder='Your Message' 
                className='textarea'
                rows={5}
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              ></textarea>
              
              <button 
                type='submit'
                disabled={isLoading}
                className={`btn rounded-full border border-white/50 max-w-[170px] px-8
                  transition-all duration-300 flex items-center justify-center 
                  overflow-hidden hover:border-accent group mx-auto ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 
                      transition-all duration-500'>
                      Let's talk
                    </span>
                    <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:translate-y-0 
                      group-hover:opacity-100 transition-all duration-300 absolute text-[22px]'/>
                  </>
                )}
              </button>
            </motion.form>
          </div>
      </div>
    </div>
  );
};

export default Contact;