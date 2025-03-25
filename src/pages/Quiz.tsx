import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const quizzes = [
  {
    id: '1',
    title: "Waste Management Basics",
    description: "Test your knowledge about basic waste management principles",
    image_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    questions: [
      {
        question: "What is the first step in the waste management hierarchy?",
        options: ["Recycling", "Reduction", "Reuse", "Recovery"],
        correct_answer: "Reduction"
      },
      {
        question: "Which type of waste requires special handling?",
        options: ["Paper", "Plastic", "Glass", "Hazardous"],
        correct_answer: "Hazardous"
      },
      {
        question: "What color bin is typically used for general waste?",
        options: ["Blue", "Green", "Black", "Yellow"],
        correct_answer: "Black"
      },
      {
        question: "What is composting?",
        options: ["Burning waste", "Recycling plastic", "Decomposing organic matter", "Landfill disposal"],
        correct_answer: "Decomposing organic matter"
      }
    ]
  },
  {
    id: '2',
    title: "Recycling Knowledge",
    description: "Challenge yourself with questions about recycling practices",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
    questions: [
      {
        question: "Which material takes the longest to decompose?",
        options: ["Paper", "Glass", "Plastic", "Aluminum"],
        correct_answer: "Plastic"
      },
      {
        question: "What should you do with recyclables before disposing?",
        options: ["Clean them", "Break them", "Paint them", "Fold them"],
        correct_answer: "Clean them"
      },
      {
        question: "Which item cannot be recycled?",
        options: ["Newspaper", "Plastic bottle", "Ceramic mug", "Aluminum can"],
        correct_answer: "Ceramic mug"
      },
      {
        question: "What happens to recycled plastic bottles?",
        options: ["They are burned", "They become new bottles", "They are buried", "They are exported"],
        correct_answer: "They become new bottles"
      }
    ]
  },
  {
    id: '3',
    title: "Environmental Impact",
    description: "Learn about how waste affects our environment",
    image_url: "https://images.unsplash.com/photo-1483569577148-f14683bed627",
    questions: [
      {
        question: "What percentage of marine pollution is caused by plastic?",
        options: ["30%", "50%", "70%", "90%"],
        correct_answer: "70%"
      },
      {
        question: "Which gas is primarily released by landfills?",
        options: ["Oxygen", "Carbon dioxide", "Methane", "Nitrogen"],
        correct_answer: "Methane"
      },
      {
        question: "How many years does it take for a plastic bottle to decompose?",
        options: ["50-100", "200-300", "400-500", "700-1000"],
        correct_answer: "400-500"
      },
      {
        question: "What is the main environmental impact of improper waste disposal?",
        options: ["Noise pollution", "Light pollution", "Soil contamination", "Air freshening"],
        correct_answer: "Soil contamination"
      }
    ]
  },
  {
    id: '4',
    title: "Water Conservation",
    description: "Test your knowledge about water conservation methods",
    image_url: "https://images.unsplash.com/photo-1538300342682-cf57afb97285",
    questions: [
      {
        question: "How much of Earth's water is freshwater?",
        options: ["1%", "3%", "10%", "25%"],
        correct_answer: "3%"
      },
      {
        question: "Which activity consumes the most water in a typical household?",
        options: ["Showering", "Toilet flushing", "Dishwashing", "Laundry"],
        correct_answer: "Toilet flushing"
      },
      {
        question: "What is greywater?",
        options: ["Rainwater", "Ocean water", "Used water from sinks and showers", "Drinking water"],
        correct_answer: "Used water from sinks and showers"
      },
      {
        question: "How many gallons of water can a dripping faucet waste per day?",
        options: ["1-2 gallons", "3-5 gallons", "5-10 gallons", "10-20 gallons"],
        correct_answer: "5-10 gallons"
      }
    ]
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = React.useState(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [timer, setTimer] = React.useState(0);
  const [showExplanation, setShowExplanation] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (currentQuiz && !showResults) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentQuiz, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
    setTimer(0);
    setShowExplanation(false);
  };

  const handleAnswer = (answer) => {
    const question = currentQuiz.questions[currentQuestion];
    const isCorrect = answer === question.correct_answer;
    
    setAnswers([...answers, { 
      question: question.question,
      userAnswer: answer,
      correctAnswer: question.correct_answer,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const retakeQuiz = () => {
    startQuiz(currentQuiz);
  };

  const handleBackToQuizzes = () => {
    setCurrentQuiz(null);
    setShowResults(false);
    navigate('/quiz');
  };

  if (currentQuiz && !showResults) {
    const question = currentQuiz.questions[currentQuestion];
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{currentQuiz.title}</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-1" />
                {formatTime(timer)}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-lg border border-gray-300 hover:bg-green-50 hover:border-green-500 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-8">
            <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-4">
              Time taken: {formatTime(timer)}
            </p>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {percentage.toFixed(0)}%
            </div>
            <p className="text-xl mb-2">
              You got {score} out of {currentQuiz.questions.length} questions correct
            </p>
          </div>

          <div className="mb-8">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full text-left font-semibold mb-4 flex items-center text-green-600"
            >
              {showExplanation ? 'Hide' : 'Show'} Answer Review
            </button>
            
            {showExplanation && (
              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">Question {index + 1}: {answer.question}</p>
                    <div className="flex items-start space-x-2">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-1" />
                      )}
                      <div>
                        <p className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          Your answer: {answer.userAnswer}
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-gray-600">
                            Correct answer: {answer.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleBackToQuizzes}
              className="px-6 py-2 border rounded-md hover:bg-gray-50"
            >
              Back to Quizzes
            </button>
            <button
              onClick={retakeQuiz}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Environmental Quizzes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={quiz.image_url}
              alt={quiz.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <button
                onClick={() => startQuiz(quiz)}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;