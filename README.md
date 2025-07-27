
NUS Orbital 2025
Milestone 3
GoonForesters
Gan Andrew Hoa Thien
Timothy Koh Zhi Heng








Poster Video App (to be updated) Logs



Foreword
This report presents our Orbital 2025 project, GoonForesters. The purpose of this report is to share our motivation, goals, and initial progress as we work towards building a meaningful and impactful application.
GoonForesters is a mobile application designed to promote sustainable living through gamification and real-world environmental action. Users are rewarded with Green Energy Points (GEP) for completing eco-friendly tasks—such as recycling, taking public transport, or reducing plastic usage. These points contribute to the growth of virtual trees, which are tied to real-life reforestation initiatives in Singapore.
We aim to bridge the gap between intention and action by creating a fun and engaging way for individuals to track their positive environmental contributions. Our app transforms everyday habits into tangible environmental outcomes, fostering a sense of ownership and purpose.
Thus far, we have designed our initial user interface and will be implementing foundational features, including user authentication, daily task tracking, a progress-based tree growth system, and leaderboard functionality. We have also laid out our development timeline and adopted software engineering practices such as version control and modular component design.
While we are at the beginning of our journey, we are motivated by the urgency of the climate crisis and the potential of digital platforms to drive change. We hope to empower individuals to become active participants in protecting our environment—one small action at a time.
We are excited to continue our development and look forward to sharing future milestones as GoonForesters evolves.

Gan Andrew Hoa Thien & Timothy Koh Zhi Heng
Team GoonForesters – Orbital 2025





Poster

Milestone 3 Poster


Proof-of Concept
Project Video
7374.MOV
Proposed Level of Achievement
Apollo 11
Aim
Our mission is to make sustainable living more engaging and accessible to everyone. GoonForesters aims to empower individuals with the tools to track their eco-conscious behaviors and see real-world results from their actions.
The application will:
Reward users with Green Energy Points for completing eco-friendly tasks
Visualize progress through the growth of virtual trees in-app
Translate digital impact into real-life tree planting efforts in Singapore
Foster friendly competition and community participation through leaderboards and milestones
By leveraging gamification, real-time feedback, and intuitive UI/UX, we aim to cultivate a community of environmentally aware users who feel motivated to take small, consistent actions toward a more sustainable world.
Motivation
Environmental challenges like climate change, deforestation, and biodiversity loss continue to threaten our planet. In 2021 alone, global CO₂ emissions reached 36.3 billion tons, and over 10 million hectares of forest were lost. Even in Singapore—often seen as a green city—individual carbon footprints remain high due to consumption habits and urban lifestyles.
While many people want to reduce their environmental impact, they often lack clear, engaging, and transparent ways to measure and act on their intentions.
Motivated by the United Nations Sustainable Development Goal 15: Life on Land, GoonForesters was created to:
Encourage eco-friendly behavior through daily micro-actions


Raise awareness about individual impact on land degradation and biodiversity


Provide a platform where digital behavior leads to measurable environmental benefit


By transforming sustainability into a game, we hope to inspire positive habits and show that even the smallest action—like choosing to walk or recycle—can collectively lead to real-world change.

User Stories
Client’s Perspective:
As a user who wants to reduce my carbon footprint, I want to track my Green Energy Points from activities like walking, biking, and recycling so that I feel rewarded for making sustainable choices.


As a user interested in Singapore’s biodiversity, I want to grow virtual trees based on native species so that I can learn about local ecosystems while contributing to their preservation.


As a user concerned about wildlife conservation, I want to donate my Green Energy Points to reforestation and habitat restoration projects so that I can help protect endangered species.


As a user seeking visibility over my efforts, I want to see metrics like trees planted, water saved, or CO₂ reduced so that I can understand the impact of my actions.


As a user committed to sustainability, I want personalized suggestions on how to improve my habits so that I can work toward a more sustainable lifestyle.


As a user building eco-habits, I want to complete daily green challenges to earn bonus points so that I stay motivated and return to the app consistently.


As a user motivated by competition, I want to view a leaderboard of top contributors so that I feel inspired to perform better in a friendly way.


As a user who appreciates recognition, I want to earn badges for milestones (e.g., planting 10 trees or walking 10 times) so that I feel acknowledged for my progress.

Service Providers Perspective:

As a business partner who supports sustainability, I want to offer my customers the ability to earn Green Energy Points for purchasing eco-friendly products so that I can promote green consumer behavior and brand alignment.


As a business partner who values data, I want to access anonymized user insights (e.g., most completed green actions) so that I can tailor my sustainability offerings effectively)


As an NGO partner who relies on public support, I want to track user contributions and impact metrics so that I can report progress to donors and stakeholders.


As a government agency that promotes national sustainability goals, I want to collaborate with platforms that gamify eco-behavior so that I can better engage citizens in ongoing green initiatives.


As a government agency encouraging environmental awareness, I want the app to display cumulative CO₂ savings and environmental impact so that the public can visualize their collective progress.





Key Features
1. Green Energy Points System (Eco-points)

Description
The EcoPoints system is a central gamification feature designed to motivate users to engage in environmentally friendly actions through the app. Users earn EcoPoints by:
Completing eco quests
Submitting quest uploads
Receiving daily and monthly login bonuses (detailed in another sections)
These points reflect a user’s eco-impact within the app and fuel progress-related features such as:
Tree growth system
Leaderboard rankings
User milestone tracking
EcoPoints act as a universal reward currency that connects various parts of the app, encouraging consistency and engagement. This is done mainly using CRUD techniques (Create, Read, Update, Detete).

Implementation

We use Cloud Firestore to store and manage all data related to the EcoPoints system. The structure is organized into three main top-level collections as shown in the screenshot below from our Firebase Firestore console:
defaultLoginBonus
Contains predefined configurations for daily, weekly, and monthly login rewards
Used to automatically distribute bonuses to users based on activity


defaultQuests
Stores all default quest templates (e.g., daily or weekly)
Each document includes quest description, point value, and type


users
Each user has a document identified by their UID. These UIDs are obtained from the Firebase Authentication page, where each registered user has a unique identifier assigned by Firebase.

From the top down in the Firestore database:
ecoPoints (field):
An integer field that stores the user's total accumulated EcoPoints
This includes points from quests, uploads, and login bonuses


quests (subcollection):
Stores all assigned quests per user with completion status and metadata (e.g., completed, type, assignedAt)


carbonEmissionList (subcollection):
Stores user-submitted carbon emissions tracking data
Detailed in a separate feature section


loginBonus (subcollection):
Logs user login reward claims and timestamps
Used to manage streaks and prevent duplicate claims


questUploads (subcollection):
Tracks all quest submission attempts made by the user
Includes supporting media, timestamps, and review status


trees (subcollection):
Stores progress data for each tree the user is growing
Includes growth stage, water droplet count, and type


These subcollections support extended features that integrate with the EcoPoints system and will be explained in detail under their respective feature sections.

Code Snippets


The fetchEcoPoints() function retrieves the currently logged-in user's UID via Firebase Authentication and uses it to access their document in the users collection on Firestore. It then reads the ecoPoints field and updates the app's state with that value to reflect the user's total accumulated points.




This snippet shows how EcoPoints are deducted when a user waters a tree. The cost is calculated based on the number of droplets, and the user's ecoPoints field in Firestore is updated accordingly.

2. Virtual Forest
 

Description
Following from Feature 1 (Eco-points), the Virtual Forest feature in GoonForesters is a gamified system that allows users to grow digital plants as a symbolic and visual representation of their eco-conscious habits. By using accumulated Eco-points, users water their trees and watch them evolve through several growth stages, providing both a sense of progress and reward.
The system currently supports three plant species: tomato, strawberry and bean. Each plant begins as an unknown seed and gradually reveals its species and appearance through five distinct growth stages: unknown, seed, sprout, seedling, sapling (with flowers) and fully grown (with fruits)
The feature is split into 2 main sections:
Growth Screen
Users select a tree (e.g., “Tomato”) and view its individual growth screen.
A progress bar displays the growth status based on wateredDroplets (out of 100).
The bottom-left corner displays the current growth stage.
Users can navigate between the three species using ‘<’ and ‘>’ navigation buttons.
The bottom-right corner includes a water button that deducts 15 Eco-points per droplet to advance the


 tree’s progress.
As the tree grows, its appearance changes through a corresponding set of five stage images (e.g., unknown and tomato1.jpg to tomato5.jpg) [reference picture above shows the seedling stage of the tomato (stage 4)

Once fully grown, a plant’s species, flowers, and fruits are revealed.
Growth Screen
Displays a scrollable grid of all trees a user is currently growing or has fully grown
Acts as a personalized collection of the user’s contributions.
Selecting a tree in the gallery navigates the user to the respective Growth Screen.

This gamified forest system serves both as a progress tracker and a reward mechanism, giving users a tangible view of their long-term environmental contributions.
Implementation
Each user is represented by a document in the users collection, identified by their Firebase Authentication UID. Under each user document, there's a trees subcollection containing individual documents for each tree species the user is growing which are currently: Tomato, Strawberry, and Bean.
As seen in the example below, for the user defaultUser, the trees collection holds subdocuments for each plant species:

Each tree document (e.g., Tomato) contains the following fields:
growthProgress: Tracks the tree’s progress numerically out of 100
wateredDroplets: Represents how many droplets have been applied (1 droplet = 15 Eco-points)
growthStage: Describes the current stage based on total progress (e.g., "Seedling")
lastUpdated: Timestamp of the last watering action, used for testing and development purposes
Growth Logic explained:
When a user decides to water his/her plant, the following actions occur:
15 Eco-points are deducted per droplet from users/{uid}/ecoPoints


The corresponding tree document in users/{uid}/trees/{treeType} is updated:
wateredDroplets increases
growthProgress mirrors wateredDroplets
growthStage is recalculated based on thresholds (see below)
lastUpdated is set to the current timestamp
Tree Gallery Integration:
If the growthProgress reaches 100, the tree is considered fully grown and is displayed with a special indicator in the Tree Gallery.
On app load, the gallery queries all documents in the trees subcollection under the current user. Each tree’s name, stage, and image are rendered in a scrollable grid. Clicking a tree opens the growth screen for that species, where users can:
See the current growth stage and image
View a progress bar tied to growthProgress
Water the tree using Eco-points
Navigate between Tomato, Strawberry, and Bean using ‘<’ and ‘>’ buttons
This system provides users with a rewarding and trackable way to visualize their sustainable efforts through plant growth.
Code Snippets
Each plant species in GoonForesters,Tomato, Strawberry, and Bean, progresses through a total of six growth stages, starting from stage 0. These stages are determined by the number of watered droplets applied to the tree, which ranges from 0 to 100. The mapping between wateredDroplets and growthStage is defined in the following function:


This fetchTrees() function retrieves the growth stage of each plant (Tomato, Strawberry, and Bean) from Firestore for the currently logged-in user.


Get the User ID: Uses auth().currentUser?.uid to fetch the currently signed-in user's unique identifier.
Initialize an Empty Object: treeStagesData will be used to store the growthStage for each tree (e.g., Tomato, Strawberry, Bean).
Loop Through Tree IDs: treeIds ["Tomato", "Strawberry", "Bean"]. For each treeId, it queries: users/{userId}/trees/{treeId} from Firestore.
Extract and Store Growth Stage: For each tree document, it retrieves the growthStage field (e.g., "Sprout", "Seedling"). If growthStage doesn't exist, it defaults to "Unknown" (when new user profile/account is created).
Set Local State: setTreeStages(treeStagesData) stores the result in state, allowing the UI to reflect each plant's current stage.








Code snippet to support ‘Growth Logic explained’ section under ‘Implementation’. Importantly, this ensures that the tree’s visual state and data stay in sync with user actions and backend storage.





3. Daily Quests & Login Rewards

Description
Users are rewarded with Eco-points by completing eco-friendly tasks presented as quests. The EcoQuest system directly powers how users earn Eco-points and encourages consistent, sustainable behaviors through small daily tasks and long-term weekly goals.
Quest Types:
Login Bonus:
Encourages daily engagement. Users receive Eco-points upon login, tracked through the month (e.g., 1/31 days completed). Claiming is allowed only once per day, with logic based on timestamp comparison and a claimed flag (shown below at code snippets and implementation)
Daily Quests:
 Simple actions like “Recycle 3 items” or “Eat a vegetarian meal” rewards 50 points each. Quests are reset daily and display real-time progress (e.g., 1/3 items recycled) and a countdown timer.
Weekly Quests:
Longer challenges like “Commute through cycling on 3 different days,” with higher point rewards (e.g., 200 points). Resets occur weekly and progress is preserved across sessions.


Each quest displays:
Visual progress bar (e.g., 2/3 completed)
Time remaining before it resets
Eco-point reward upon completion
A Reset Button is also available at the bottom of the EcoQuest page (for testing purposes only). This manually clears and refreshes the user's quest data using backend logic that would normally run automatically.

Implementation
Each user is represented by a document in the users collection, identified by their Firebase Authentication UID. This example uses defaultUser’s subcollections:

The loginBonus subcollection used to track monthly login streaks and reward claims.
As shown in the screenshot, for the user defaultUser, the loginBonus subcollection includes a document named January, which records the user's login activity for the month of January.
Each document under loginBonus corresponds to a specific month and includes the following fields:
progress
An integer that tracks how many days in the month the user has successfully claimed a login bonus.
For example, a value of 7 means the user has logged in and claimed the bonus on 7 different days during that month.
Timestamp (refer to code snippets for in-depth details):
A timestamp indicating the most recent day on which the user claimed a login bonus.
This is used to determine:
Whether the user is eligible to claim the bonus again today
Whether to increment the progress count
Whether a new month should start a fresh bonus streak



The loginBonus subcollection used to track the user’s daily login activity and reward streak progress.
As shown in the example, for the user defaultUser, the loginBonus subcollection contains a document named January, which stores the user’s login progress for that specific month.
Each document under loginBonus represents a specific month and contains the following fields:
progress: An integer that tracks how many days in the month the user has logged in and claimed their bonus. For example, progress: 10 means the user has claimed rewards on 10 different days that month (for monthly quest)
Timestamp (refer to code snippets for in-depth details): A timestamp of the last login bonus claim. This is used to:
Prevent multiple claims within the same day
Determine if a new claim is eligible
Support auto-reset logic on the backend each new month

The questUploads subcollection that stores all submitted evidence for eco quests, typically in the form of uploaded images.
As shown in the example, for the user defaultUser, the questUploads subcollection contains a document named sampleSubmission, which represents one user-submitted entry.
Each document inside questUploads represents a single quest submission and includes the following fields:
imageUrl: A string containing the URL of the uploaded image (usually pointing to Firebase Storage). This image serves as proof of the completed eco quest.
questTitle: A string indicating the name of the quest the submission is associated with (e.g., “Recycle 3 items”).
timestamp: The exact date and time the submission was made. This is used for sorting, filtering, and possibly validating whether the submission falls within the allowed timeframe for the quest.



Code Snippets
These two functions calculate the time remaining until the next quest reset based on Singapore Time (SGT). The getHoursToNextSGTMidnight() function returns the countdown to the next daily reset at midnight SGT (i.e., 16:00 UTC), ensuring that daily quests refresh at a consistent local time. Meanwhile, getDaysToNextMondaySGT()computes the remaining time until the next weekly reset on Monday at 00:00 SGT. Together, they provide accurate countdowns used in the app’s UI to inform users when new daily or weekly quests will become available, using real-time time calculations aligned with local time zones.
Daily
Weekly
There are once again functions fetchQuests() and checkLoginBonus() that are in charge of retrieving data from firestore on the fields’ values under the quests and loginBonus subcollections. Steps are similar to Feature 2 (code snippets) except for the following section that is under checkLoginBonus():

This code ensures that each user has only one login bonus document corresponding to the current month under their loginBonus subcollection. Steps are shown:
Loop through all existing loginBonus documents:
If a document ID matches the current month (e.g., "July"), it sets hasCurrentMonth = true.
If it's not the current month, it's considered outdated and is deleted.


If the current month's document does not exist, it creates a new document for that month with:
progress: 0 (indicating no login streak yet)
timestamp: null (which will later store the last claimed login date)
This helps keep the loginBonus collection clean and ensures users are only tracked for the current active month.
For the actual implementation of checking for the login bonus, under the checkLoginBonus() function, it is mainly split into 2 parts: checking claim eligibility and Firestore transaction & UI update
Checking claim eligibility:
Verifies a user is signed in and that login bonus data exists.
Converts the last claimed timestamp to a Date object.
Checks if the user has already claimed today’s bonus.
If yes, shows an alert and exits.
If no, calculates the new progress count (capped by the monthly max).


Firestore transaction & UI update:
Accesses the user's Firestore document and their current month's login bonus doc.
Runs a transaction to:
Increment the user’s eco-points by 100.
Update the login bonus progress and log the current timestamp.


 

4. Profile, Leaderboards & Badges

Description
The Profile section in GoonForesters allows users to view and manage their personal information and sustainability statistics. It includes:
User avatar (with upload capability)


Name and general location


Total Eco-points earned and trees planted


A list of earned badges


Contact details (phone number and email)


Users can navigate to the Edit Profile screen to update their name, location, email, and phone number, as well as upload a new profile image.
This section personalizes the app experience and provides a sense of ownership over users' sustainable identity.


Implementation
The profile system is built using React Native for the frontend and Firebase Firestore for backend storage.
Each user has a document in the users collection containing fields such as name, location, email, phoneNumber, ecoPoints, treesPlanted, and badges. When the profile screen loads, these details are fetched from Firestore and rendered in the UI. The profile picture is stored in Firebase Storage, and its URL is saved in the user document.
On the Edit Profile screen, input fields are pre-filled with the current user data. When the user submits updated information, the app writes the changes back to Firestore. Image uploads are handled via the Firebase Storage SDK, and once uploaded, the image URL replaces the existing profile picture reference in Firestore. This architecture ensures that all updates are synced across devices in real time.


Description
The Leaderboards feature lets users compare their Eco-point contributions with others across three categories:
Friend


Region


National


Each leaderboard displays:
A podium view of the top 3 contributors


A ranked list with names, points, and positions


A recap of the user’s past performance (e.g., “You finished #5 in the region last month”)


Leaderboards encourage friendly competition, helping drive recurring engagement and a collective sense of progress.
Implementation
The leaderboard feature is implemented using Firestore for data storage and Cloud Functions for background aggregation.
Each user’s total Eco-points is continuously updated in their main users’ document. A scheduled Firebase Cloud Function runs daily or hourly to collect all users' Eco-point totals and compute rankings for three categories: friend, region, and national. The results are stored in corresponding leaderboard collections such as leaderboard_region or leaderboard_national.
When the user navigates to the leaderboard page, the app queries the appropriate leaderboard based on the selected tab and displays the top-ranked users. The user’s current position is highlighted for visibility, and previous rankings (e.g., “You finished #5 in the region last month”) are retrieved from archived snapshots to show progress over time.




5. Real-World Impact Dashboard

Description
The real world impact dashboard lets users better monitor and understand their green habits over varying time periods over a day, week and months. These savings are tracked and visualised through
It will be visualised differently depending on the time period selected. For daily it will just show that days amount, for weekly it will show a bar chart comparing days to daily carbon reduction and for months it will show a line graph of carbon reduction against days
A summary line will highlight the daily average saved
Insight cards will also show the equivalent real-world impact
The end goal of these dashboard is to the be able to provide real-time feedback that helps user to recognise their individual contributions to sustainability and encourage them to continue or improve their sustainability

Implementation philosophy
Carbon emissions charts 
Each current already has a carbon footprint statistics inherent to it -> every time a quest is completed it is logged -> in a quest log
Cloud function -> at the end of each day the quest log is queried and the carbon saved per day is saved into carbon stats_history with a unique week ID and day ID
On screen load -> carbon stats is quired to obtain the necessary results to display daily,weekly and monthly charts
Impact cards
There will be a series of 8 different impact cards from which 2 will be selected and shown
These impact messages are derived using fixed conversion rates completed client-side after queried data from carbon stats

6. Personalized Green Recommendations

Description
The Eco-tips feature provides users with personalized, actionable advice to reinforce sustainable behaviour both inside and outside the app. It includes

A Recommendation of the day based on user habits (e.g. increase your cycling amount you haven't been doing it as much)
A daily habit suggestions which contains 3 statistics with the general idea being that 
The first one encourages you to continue doing a certain recycling habit to reach a certain threshold e.g. keep recycling and you’ll be in the top 5% nationwide
The second one gives you a generic recommendation e.g. using reusable bags to help reduce waste
A general word of encouragement based on what you have been doing right e.g. you’ve made 5 eco-friendly purchase this month, keep it up
Beyond the app section which provides a simple url to current eco-friendly events which is nearest to the user and a link to share the app with other users

Implementation philosophy
Have a tips collection which contains static and dynamic tips storing information in the form of“category” e.g: cycling, “text”: “You haven’t been cycling as much lately…., “type”: “daily recommendation”, and a trigger. This can be used to contain both Recommendation of the day and daily habits as they can be stored as different type
Each user will have a user metrics which tracks information like “cyclingDay” ,“recyclable items” and” eco-products purchased” on a week by week basis
Event which is defined by a unique event ID and has a title, a link and a region -> user will be shown events in their own respective regions
Firebase cloud function, which triggers as a daily scheduled job -> fetch user behavior metrics -> match against tip triggers from tips collection -> store selected daily tip and eco-tips of the day in users/{userId}/ecoTips 
On entry of Eco-tips screen -> fetches from ecoTip collection and local event from events collection filter by region

Other Figma Mockup
Figma link: Figma
Initialisation/Introduction

Login/Account Creation

Feedback & Suggestions




Testing & Evaluation
1.Unit testing: To validate core logic for each individual features such as eco-points calculation, quest state transition and tree growth thresholds
Eco-point handling ->verify point deduction upon watering trees, point rewards on quest completion and admin-control overrides 
For this feature test edge cases like if users can’t go below 0 points or exceed a certain large amount
Quest progression
Validate quest updates properly on user action 
Ensure completed quest updates flags -> such as carbon use metrics
Growth logic for virtual tree
Test stages of growth threshold 
Ensure correct visual tree stage based on stage value
Correct display of tree gallery on both home screen and on access
Impact dashboard logic:
Unit-test carbon savings calculations and conversion into equivalent statistics
Testing of most of these will be done either by using react native testing library for frontend logic and firebase emulator suite for offline firestore function testing
2.Integration testing: Ensure smooth interactions between firebase, react native components and cloud functions
For daily quest -> test quest completion flow -> simulate user completing quests -> see if eco-points increases
For tree planting -> ensure that button tap -> leads to deduction of points + updated ecopoints and re-render tree state correctly in gallery
Leaderboards and quest reset test for timing and correct data imputed in refresh 
Simulate multiple device user login to ensure real-time firestore update sync UI State (e.g. quest progress, ecoPoints)


3.System testing: Validate the overall behaviour and performance across full platforms (e.g. ios and android)
Cross-Feature flow tests -> see accuracy of leaderboard updates across both emulators and real devices when quest are completed -> points gained -> trees watered 
Test firebase -> confirm data consistency under concurrent updates -> two users completing or two actions modifying quests -> test how the systems as a whole handles conditions and ensures no data loss or corruptions
Ensure scheduled task functions properly
Ensure there is no conflict with other running process (like quests being completed during a reset)
4.User testing: Collect qualitative feedback on usability and gamification experion
Pilot test groups:10-20 users for early access
Assigned a list of tasks:
Complete quests, view impact dashboard, interact with leaderboard and grow a tree to full maturity
Obtain UserFeedback and apply appropriately




Tech Stack

Layer
Tools/Frameworks
Description of intended use
Frontend
React Native (TypeScript) via Expo
-React Native is used to build the user interface of GoonForesters to allow for a consistent experience across both Android and IOS devices
-TypeScript is used for better type safety, maintainability, and developer tooling. In general all our screens for our respective tabs will be made using typescript
-Expo helps to streamline our development by managing our workflow and over-the-air updates. Furthermore we make use of expo-router to help provide structured navigation from one screen to another
-General UI/UX components will be provided using libraries such as  react-native re-animated for animated tree growth visual
Backend
Node.js + Express (TypeScript)
-Node.js will help wil external API calls and allows for clean API separation between frontend and backend
-Makes use of npm to read the package.json and download required libraries and help maintain dependency integrity
Database
Firebase (Firestore, authentication,Firebase cloud functions)
-Firebase Authentication manages our user sign-up, login and session handling with email/password. As well as allowing us to make use of alternative login methods through google and facebook
-FireStore stores all user data including 
User profiles & eco-points
Quest and completion status 
Tree gallery data and growth progress
(further elaboration on whole firebase will work with each is further elaborated in the features page above)
-We use firestore as the real-time sync allows updates to be instantly reflected in the app and the firebase rules helps to enforce access control and user data isolation
-Firebase Cloud Function helps to automate backend trippers when a quest is completed or tree is fully grown and is used to handle scheduled task (refreshing of quest on a daily/weekly/monthly basis)
DevOps/Tools
GitHub (version control, issue tracking, collaboration)
Github serves as a central platform for:
Version control using Git -> by creating individual branches to work on features independently and then merging it via Pull Requests  (ensure all commit comes with meaning messages in proper formatting, feat when adding new feature and fix when solving bugs)
Issue tracking -> make use of Github issues to log bugs,features request and tasks -> each issue will then be assigned to team members 
Collaborations & Code reviews -> We will push codes to feature branches and submit pull request for review. The other teammates will them comment on changes, suggest improvements before approving merges -> ensuring cross checking before any merge are approved


Software Engineering Practices
1.Agile Development
We follow a Sprint-based workflow with regular calls for planning and retrospectives. When schedules do not align we instead send text updates to each other to ensure that each member is up to date and involved in planning 
Features broken into manageable tasks and continuously improved through feedback loop
2. Code Reviews
All code changes go through peer code reviews via github pull request this ensure the code is clean and maintainable 
3. Automated testing
Automated tests are written for key logic layers to ensure correctness E.g: EcoPoints calculations, quest completion logic and tree growth are all tested using unit testing frameworks
4. Version Control 
Making use of development branches to help organise feature creation  and ensure all code changes are documented cleary 

Future Extensions
Partner with NGOs and businesses for redeemable point systems
Launch themed, time-sensitive sustainability events
Offer APIs for 3rd-party sustainability platforms
Track live tree-planting impact via GPS/QR check-ins
social media integration



Timeline
For MileStone 3 (28 July)
-Due to complexity and personnel time constraints due to also having to build the initial  baseline knowledge of the systems. We were not able to conduct higher level testing and often unit testing would reveal flaws in our implementation methods. Thus we want to make that the priority on the following weeks to plan and nail our core features while implementing them with higher level interactions in mind
-Continue with weekly schedule calls to update each other on feature progress. With focus on planning and reviewing features, to ensure that each feature can handle higher level integration


Team
We are two people from different faculties hoping to combine our skills and expertise to make an app which can make a difference in SIngapore. We each have relevant skills from our previous modules taken in nus, and we hope to use these skills as a baseline and through the development process of this app deepen our technical and interdisciplinary capabilities. WIth the end goal being providing an app  that can help combat climate change with community empowerment and meaningful tech.

Contact
For partnership or collaboration: 
e1398281@u.nus.edu (Andrew)
e1397982@u.nus.edu (Timothy)

