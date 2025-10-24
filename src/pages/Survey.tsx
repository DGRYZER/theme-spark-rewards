import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardList, CheckCircle, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const questions = [
    {
      id: 0,
      question: "How often do you use LATICRETE products?",
      type: "radio",
      options: [
        "Daily",
        "Weekly",
        "Monthly",
        "Occasionally"
      ]
    },
    {
      id: 1,
      question: "Which LATICRETE product line do you use most?",
      type: "radio",
      options: [
        "Tile & Stone Installation",
        "Grout & Adhesives",
        "Waterproofing",
        "Concrete Solutions"
      ]
    },
    {
      id: 2,
      question: "How would you rate your overall experience with LATICRETE?",
      type: "radio",
      options: [
        "Excellent",
        "Very Good",
        "Good",
        "Fair",
        "Poor"
      ]
    },
    {
      id: 3,
      question: "What do you value most about LATICRETE products?",
      type: "radio",
      options: [
        "Quality & Durability",
        "Ease of Use",
        "Technical Support",
        "Competitive Pricing",
        "Product Innovation"
      ]
    },
    {
      id: 4,
      question: "Any additional feedback or suggestions?",
      type: "textarea",
      placeholder: "Share your thoughts..."
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const pointsReward = 250;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (!answers[currentStep]) {
      toast({
        title: "Answer Required",
        description: "Please answer the question to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Survey completed
      setIsCompleted(true);
      toast({
        title: "Survey Completed!",
        description: `You've earned ${pointsReward} points!`,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary px-4 py-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
          </div>
          
          <div className="mx-auto max-w-6xl relative z-10">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                <ClipboardList className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-bold">Survey</h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="p-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Your feedback helps us improve
                </p>
                <div className="p-4 rounded-2xl bg-primary/10 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
                  <p className="text-4xl font-bold text-primary">+{pointsReward}</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleGoToDashboard}
                className="px-8 py-6 text-lg"
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 py-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-primary-foreground rounded-full translate-y-1/2" />
        </div>
        
        <div className="mx-auto max-w-6xl relative z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
              <ClipboardList className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">Customer Survey</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Share your feedback and earn {pointsReward} points</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
          
          {currentQuestion.type === "radio" ? (
            <RadioGroup 
              value={answers[currentStep] || ""} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea
              value={answers[currentStep] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="min-h-32 text-base"
            />
          )}
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep < questions.length - 1 ? (
              <>
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </>
            ) : (
              "Submit Survey"
            )}
          </Button>
        </div>

        {/* Reward Info */}
        <Card className="p-4 mt-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Complete the survey to earn {pointsReward} points</p>
              <p className="text-xs text-muted-foreground">Your feedback is valuable to us</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
