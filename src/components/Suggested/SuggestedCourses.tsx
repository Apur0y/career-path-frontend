import React from "react";
import CourseSection from "./CourseSection";
import ComponentHeader from "../shared/ComponentHeader";
import Container from "../ui/Container";

export default function SuggestedCourses() {


  return (
    <div className="bg-card">
      <Container>
        <div id="course" className="space-y-12">
          <ComponentHeader
            title="Suggested Courses"
            description="Enhance Your Skills with Our Paernaer Courses. Learn , Grow, Succed."
          ></ComponentHeader>

          <CourseSection></CourseSection>
        </div>
      </Container>
    </div>
  );
}
