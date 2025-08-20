
import React, { useState, useCallback } from 'react';
import { generateDurianArticle } from './services/geminiService';
import Header from './components/Header';
import ArticleForm from './components/ArticleForm';
import ArticleDisplay from './components/ArticleDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [article, setArticle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateArticle = useCallback(async (currentTopic: string) => {
    if (!currentTopic.trim()) {
      setError('Vui lòng nhập chủ đề cho bài viết.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setArticle('');

    try {
      const generatedArticle = await generateDurianArticle(currentTopic);
      setArticle(generatedArticle);
    } catch (e) {
      console.error(e);
      setError('Đã xảy ra lỗi khi tạo bài viết. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-light-green font-sans text-brand-dark">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://picsum.photos/seed/durianfarm/1920/1080')"}}
      ></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-brand-dark mb-2">Chủ đề bài viết kỹ thuật</h2>
            <p className="text-gray-600 mb-6">Nhập chủ đề bạn quan tâm, ví dụ: "Kỹ thuật tỉa cành tạo tán cho sầu riêng Musang King" hoặc "Phòng trừ bệnh thối rễ do Phytophthora trên cây sầu riêng".</p>
            
            <ArticleForm
              topic={topic}
              setTopic={setTopic}
              onSubmit={handleGenerateArticle}
              isLoading={isLoading}
            />

            <div className="mt-8">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorDisplay message={error} />}
              <ArticleDisplay article={article} isLoading={isLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
