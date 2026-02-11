import bgImage from '../assets/back.jpg';

export const MainLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full px-4">
        {children}
      </div>
    </div>
  );
};
