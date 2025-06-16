import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    // <div className="  min-h-lvh min-w-full flex justify-center align-middle">
    <Card className="">
      <CardHeader>
        <CardTitle>LMS : Library Management System</CardTitle>
        <CardDescription>the application is designed from the librarian perspective</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
    </Card>
    // </div>
    
  );
};

export default AboutPage