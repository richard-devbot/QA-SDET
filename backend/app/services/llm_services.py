from llama_index.core.llms import ChatMessage
import os
from llama_index.multi_modal_llms.gemini import GeminiMultiModal
from llama_index.llms.gemini import Gemini


llm = Gemini(model_name="models/gemini-1.5-flash-latest", api_key=os.getenv("GOOGLE_API_KEY"))
mm_llm = GeminiMultiModal(model_name="models/gemini-1.5-flash", api_key=os.getenv("GOOGLE_API_KEY"))

def generate_test_ideas(url, selected_elements):
    role = "You are a Software Test Consultant with expertise in web application testing"
    prompt = f"""Generate test ideas based on the selected elements of the webpage. 
    Focus on user-oriented tests that cover functionality, usability, and potential edge cases. 
    Include both positive and negative test scenarios. Consider the element types and their potential interactions.

    Page URL: {url}
    
    Selected Elements:
    {selected_elements}

    Please provide a mix of positive and negative test scenarios, considering the interactions between the selected elements.
    Format the output as a numbered list of test scenarios.

    Format the output as the following example:
    Positive Tests:
    - <Idea 1>
    - <Idea 2>

    Negative Tests:
    - <Idea 1>
    - <Idea 2>

    Edge Cases and Usability Tests:
    - <Idea 1>
    - <Idea 2>
    """
    
    messages = [ChatMessage(role="system", content=role),
                ChatMessage(role="user", content=prompt)]
    response = mm_llm.chat(messages)
    return response.message.content

def generate_gherkin_feature(user_story, detail_level):
    if detail_level == "Detailed":
        custom_prompt_template = """Create a comprehensive Gherkin feature file based on the provided user story. Follow these instructions to produce a detailed output:
                                Instructions:
                                1. Carefully analyze the user story and extract all possible scenarios, including edge cases and alternative flows.
                                2. Create multiple scenarios to cover various aspects of the feature, considering different user inputs, conditions, and outcomes.
                                3. Use descriptive and specific language for each step.
                                4. Include background steps if there are common preconditions for all scenarios.
                                5. Utilize scenario outlines with examples for data-driven scenarios when appropriate.
                                6. Consider both happy path and negative scenarios.
                                7. Add relevant tags to group related scenarios.
                                FORMAT:
                                Feature: [Feature Name]
                                As a [type of user]
                                I want [goal]
                                So that [benefit]
                                Background: (if applicable)
                                    Given [common preconditions]

                                @tag1 @tag2
                                Scenario: [Primary Scenario Name]
                                    Given [precondition]
                                    And [another precondition]
                                    When [action]
                                    And [another action]
                                    Then [expected result]
                                    And [another expected result]

                                @tag3
                                Scenario: [Alternative Scenario Name]
                                    Given [different precondition]
                                    When [different action]
                                    Then [different expected result]

                                @tag4
                                Scenario Outline: [Data-driven Scenario Name]
                                    Given [precondition with <variable>]
                                    When [action with <variable>]
                                    Then [expected result with <variable>]

                                    Examples:
                                    | variable | other_variable |
                                    | value1   | other_value1   |
                                    | value2   | other_value2   |

                                @negative @edge_case
                                Scenario: [Negative Scenario Name]
                                    Given [precondition for negative case]
                                    When [action that should fail]
                                    Then [expected error or failure result]

                                Context: {context}
                                Answer:
                                """
    else:
        custom_prompt_template = """Create the feature file as per BDD framework for provided test case in question. Follow below instructions to produce output
                    Instructions
                    1. Carefully analyse the test case provided with each step.
                    2. Do not skip or ignore any test step as these are critical for feature file creation.
                    3. Your correct interpretation would help subsequent prompt to provide correct responses.
                    4. Strictly adhere to the format provided below.
                    FORMAT
                    Feature: [Feature Name]
                    Description: [Brief description of the functionality under test]

                    Scenario Outline: [Scenario Name]
                    Given [Preconditions]
                    When [Event or Action]
                    Then [Expected result]
                    And [Additional expected results]
                    But [Optional: Negative expected results]

                    Examples:
                    | [Parameter 1] | [Parameter 2] |... |
                    | [Value 1]     | [Value 2]     |... |
                    | [Value 3]     | [Value 4]     |... |

                    Context: {context}
                    Answer:
                    """

    prompt = custom_prompt_template.format(context=user_story)
    messages = [ChatMessage(role="user", content=prompt)]
    response = llm.chat(messages)
    return response.message.content
