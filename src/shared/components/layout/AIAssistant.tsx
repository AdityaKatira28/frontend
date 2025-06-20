import React, { useState } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/utils/cn';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI security assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    'Analyze current threats',
    'Optimize security budget',
    'Generate security report',
    'Check compliance status',
  ];

  const handleQuickAction = (actionMessage: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: actionMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'll help you with "${actionMessage}". Let me analyze the data and provide you with insights.`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSendMessage = (msg?: string) => {
    const messageText = msg || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${messageText}". Let me provide you with relevant information and recommendations.`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-96 h-[600px] bg-slate-900 border border-slate-700 rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-white">AI Security Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'assistant' && (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] p-3 rounded-lg',
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-200'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">U</span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-800 text-slate-200 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="text-xs bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about security..."
              className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 