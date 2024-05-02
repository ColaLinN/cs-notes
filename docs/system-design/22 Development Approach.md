



# software development approach

**Test Driven Development 测试驱动开发**

Test Driven Development (TDD) is **a software development approach where tests are written before the actual code**. It offers several advantages: Comprehensive Test Coverage: TDD ensures that all new code is covered by at least one test, leading to more robust software.



QA from [The Case Agiainst 100% Code Coverage](https://about.codecov.io/blog/the-case-against-100-code-coverage/)

1. Why 100% Code Coverage is not Always Ideal for Organizations
   1. Test Quality over Test Quantity. That means that organizations that prioritize high code coverage without investing in good tests are not going to gain any good benefits from tracking coverage. In fact, this is more likely to be harmful.
   2. Engineering Time is Finite. Whatever the case, in the time that a developer takes to get to 100%, they could have been pushing out a new feature.
2. What About 80% Code Coverage?
   1. “We offer the general guidelines of 60% as “acceptable”, 75% as “commendable” and 90% as “exemplary.” --Google
   2. In fact, most repositories that use Codecov find that their code coverage values slide downwards when they are above 80% coverage.
   3. Although we can’t tell you what your code coverage value should be as every repository is different, we can strongly recommend aiming for somewhere between 75-85% coverage.
3. Using Codecov to increase code coverage
   1. Use sort by file % feature. Can help direct a team to focus on pieces of the codebase that have the lowest test coverage.
   2. Use Impact Analysis to identify critical code files



**BDD 行为驱动开发**

Behavior-driven development (BDD) is an Agile software development methodology in which an application is documented and designed around the behavior a user expects to experience when interacting with it.

Simply put, in TDD, developers test first, then use the test results to guide their development, while in BDD, developers express the system behavior they want to create through Gherkin syntax, then code according to those Gherkin expressions.

Gherkin uses a set of special keywords to give structure and meaning to executable specifications. Each keyword is translated to many spoken languages; in this reference we’ll use English.



**Domain Driven Design 领域驱动设计**

Domain-Driven Design(DDD) is **a collection of principles and patterns that help developers craft elegant object systems**. Properly applied it can lead to software abstractions called domain models. These models encapsulate complex business logic, closing the gap between business reality and code.

