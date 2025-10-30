import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Biblioteca de Códigos Interativos
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Códigos prontos para usar em livros digitais: caça-palavras, ligar pontos, quiz e muito mais!
        </p>
      </div>
    </header>
  );
}
