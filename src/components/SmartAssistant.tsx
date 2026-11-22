import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  X,
  Send,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowUpLeft,
  RotateCcw,
} from 'lucide-react';
import {
  COMPANY_INFO,
  PortfolioCategoryId,
  SERVICES_DATA,
  ServiceItem,
} from '../data/companyData';
import {
  AssistantAction,
  getAssistantResponse,
  WELCOME_SUGGESTIONS,
} from '../utils/assistantEngine';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  actions?: AssistantAction[];
  suggestions?: string[];
}

interface SmartAssistantProps {
  onSelectServiceModal: (service: ServiceItem) => void;
  onJumpToPortfolioCategory: (category: PortfolioCategoryId) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  sender: 'assistant',
  text: 'مرحباً بك في فنون للديكور، كيف يمكنني مساعدتك؟\nأنا «مساعد فنون الذكي» (أعمل محلياً داخل الموقع عبر قاعدة معرفة ذكية)، يسعدني إجابتك فوراً عن خدماتنا، موقعنا في عدن، أوقات الدوام، وأعمالنا.',
  actions: [
    { label: 'استعرض خدماتنا (23 خدمة)', type: 'scroll', target: '#services' },
    { label: 'معرض أعمالنا', type: 'scroll', target: '#portfolio' },
  ],
  suggestions: WELCOME_SUGGESTIONS,
};

export const SmartAssistant: React.FC<SmartAssistantProps> = ({
  onSelectServiceModal,
  onJumpToPortfolioCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const response = getAssistantResponse(trimmed);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'assistant',
      text: response.answer,
      actions: response.actions,
      suggestions: response.suggestedFollowUps,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleActionClick = (action: AssistantAction) => {
    if (action.type === 'external') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action.type === 'open-service' && action.serviceId) {
      const found = SERVICES_DATA.find((s) => s.id === action.serviceId);
      if (found) {
        onSelectServiceModal(found);
        return;
      }
    }

    if (action.type === 'filter-portfolio' && action.portfolioCategory) {
      onJumpToPortfolioCategory(action.portfolioCategory);
      return;
    }

    // Default scroll to section
    const el = document.querySelector(action.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-50">
      {/* Floating Assistant Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="فتح نافذة مساعد فنون الذكي"
          className="group flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#080808] hover:bg-[#111111] text-[#F7F3EA] border-2 border-[#F5A900] shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
        >
          <span className="p-1.5 sm:p-2 rounded-xl bg-[#F5A900] text-[#080808]">
            <MessageSquareText className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <div className="text-right pr-0.5">
            <p className="font-display font-extrabold text-xs sm:text-sm text-[#F5A900] leading-tight">
              مساعد فنون الذكي
            </p>
            <p className="font-body text-[11px] text-[#E9DDC9]/80 hidden sm:block">
              اسألنا عن الخدمات والموقع والدوام
            </p>
          </div>
        </button>
      )}

      {/* Assistant Chat Modal Window */}
      {isOpen && (
        <section
          aria-label="نافذة محادثة مساعد فنون الذكي"
          className="w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] bg-[#111111] text-[#F7F3EA] rounded-2xl border-2 border-[#F5A900]/60 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 bg-[#080808] border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.logo}
                alt="شعار فنون للديكور"
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
              />
              <div>
                <h3 className="font-display font-extrabold text-sm sm:text-base text-[#F5A900] flex items-center gap-1.5">
                  <span>مساعد فنون الذكي</span>
                  <Sparkles className="w-4 h-4" />
                </h3>
                <p className="text-[11px] text-[#E9DDC9]/75 font-body">
                  قاعدة معرفة محلية فورية · بدون اتصال خارجي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleResetChat}
                aria-label="بدء محادثة جديدة"
                title="إعادة تعيين المحادثة"
                className="p-2 rounded-lg text-[#E9DDC9]/70 hover:text-[#F5A900] hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق مساعد فنون الذكي"
                className="p-2 rounded-lg text-[#E9DDC9]/70 hover:text-[#F5A900] hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[58vh] bg-[#111111]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-start' : 'items-end'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#F5A900] text-[#080808] font-display font-bold rounded-tr-xs'
                      : 'bg-[#080808] text-[#F7F3EA] border border-white/10 rounded-tl-xs'
                  }`}
                >
                  {msg.text}

                  {/* Interactive Actions inside Assistant Reply */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5A900]/15 hover:bg-[#F5A900] text-[#F5A900] hover:text-[#080808] border border-[#F5A900]/40 font-display font-bold text-xs transition-colors"
                        >
                          <span>{act.label}</span>
                          <ArrowUpLeft className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Follow-Up Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSendQuestion(sug)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#F5A900]/20 text-[#E9DDC9] hover:text-[#F5A900] border border-white/10 text-xs font-body transition-colors text-right"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct Contact Strip inside Chat */}
          <div className="px-4 py-2 bg-[#080808]/90 border-t border-white/10 flex items-center justify-between text-xs text-[#E9DDC9]">
            <span>للتواصل المباشر الفوري:</span>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#F5A900] hover:underline font-display font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </a>
              <a
                href={COMPANY_INFO.contact.telUrl}
                className="inline-flex items-center gap-1 text-[#F7F3EA] hover:text-[#F5A900] font-display font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-[#F5A900]" />
                <span>اتصال</span>
              </a>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(input);
            }}
            className="p-3 bg-[#080808] border-t border-white/10 flex items-center gap-2"
          >
            <label htmlFor="assistant-chat-input" className="sr-only">
              اكتب سؤالك لمساعد فنون الذكي
            </label>
            <input
              id="assistant-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن خدمة، بديل رخام، الموقع، الدوام..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#111111] border border-white/15 focus:border-[#F5A900] focus:outline-none text-xs sm:text-sm text-[#F7F3EA] placeholder:text-[#77736C]"
            />
            <button
              type="submit"
              aria-label="إرسال السؤال"
              className="p-2.5 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
};
