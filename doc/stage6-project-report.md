# Stage 6 Project Report

1. Please list out changes in the directions of your project if the final
   project is different from your original proposal (based on your stage 1
   proposal submission).

    - In our original proposal, we planned to use the crime data from the LA PD
      and maps from OpenStreetMap to provide users with the safest path from one
      location to another. However, since the time is limited we did not
      implement the path suggestion feature. Instead, we focused on providing
      users with a crime map and visualizing the locations of crimes on the map.

    - Beside the crime map, we also implemented other useful features that are
      not included in the original proposal, such showing the numbers of
      different types of crimes in given areas, which can be useful for users
      to make informed decisions about their safety.

2. Discuss what you think your application achieved or failed to achieve
   regarding its usefulness.

    - Our application has basic functionalities such as searching for crimes
      based on various criteria, e.g. searching by crime type / event Id / date
      / area; viewing the crime map, updating crime information, delete crime
      reports, and reporting new crimes. These functionalities are useful for
      users to get information about crimes in Los Angeles and make informed
      decisions about their safety. Beside, we also implemented some advanced
      functionalities such as showing the numbers of different types of crimes
      in given areas and visualizing the locations of crimes on the map. These
      functionalities are useful for users to get an intuitive understanding of
      the crime situation in Los Angeles.

    - Our application failed to achieve the path suggestion feature
      that we planned to implement in the original proposal. This feature is
      useful for users to find the safest path from one location to another.
      However, since the time is limited, we did not implement this feature.

3. Discuss if you changed the schema or source of the data for your application

    - No, we did not change the schema or source of the data for our
      application. The schema is decided in stage 2 and the source of the data
      (except for the data of the crime map) is decided in stage 1.

4. Discuss what you change to your ER diagram and/or your table
   implementations. What are some differences between the original design and
   the final design? Why? What do you think is a more suitable design? 

    - We changed our ER diagram according to Ta's advice in stage 2. In our
      original ER diagram, we have six entities, namely `Users`, `Crimes`,
      `Victims`, `Streets`, `Areas`, and `Events`, where each victim is
      uniquely identified by a victim ID and each street is identified by the
      street name and the area it belongs to (weak entity). However, TA pointed
      out that the `Victims` should be a weak entity of `Crimes` and the
      `Areas` and `Streets` should be merged into one entity. Therefore, we
      changed our ER diagram accordingly and the final ER diagram is more clear
      and concise in our opinion.

5. Discuss what functionalities you added or removed. Why?

    - We added the following functionalities:
        - Showing the numbers of different types of crimes in given areas, which
          can be useful for users to make informed decisions about their safety
        - Visualizing the locations of crimes on the map, which can help users
          to get an intuitive understanding of the crime situation in Los Angeles

    - We removed the following functionalities:
        - Path suggestion feature, which can help users to find the safest path
          from one location to another. We removed this feature because we did
          not have enough time to implement it.

6. Explain how you think your advanced database programs complement your
   application.
      - Our advanced database programs complement our application by providing
         users with useful information about crimes in Los Angeles. For example,
         the numbers of different types of crimes in given areas can help users to
         make informed decisions about their safety. The visualization of the
         locations of crimes on the map can help users to get an intuitive
         understanding of the crime situation in Los Angeles.
7. Each team member should describe one technical challenge that the team
   encountered.  This should be sufficiently detailed such that another future
   team could use this as helpful advice if they were to start a similar
   project or where to maintain your project.
      - One technical challenge that Mingjun encountered is the CORS policy setting
         between the frontend and the backend. The frontend and the backend could be
         deployed on different servers. In this case, we need to set the CORS policy to
         allow the frontend to access the backend. Otherwise, the frontend will not be
         able to access the backend. To solve this problem, we need to set the CORS
         policy in the backend, which is quiet confusing for us at the beginning. We
         would suggest future teams do not use separate frontend and backend while just
         keep the framework as a simple one then no need to set the CORS policy.
      - One technical challenge that Xuanbo encountered it the difference beween GET and POST in website request. In our UPDATE operation, we tried to use POST to request according to a JSON, which records infomations we want to update. But somehow, we failed to use POST to complete this functionality. Therefore, we turned to GET, using the link recording all the infomations to request.
      - One technical challenge that Shihua encountered is that in the "Statistic" part, we design the checked boxes to select required crime types and areas. However, it always got some delays. The final selected chexked boxes cant transfered into the request. Therefore, we designed a refresh button, which could make sure the checked boxes are selected and transitted to the backend.
8. Are there other things that changed comparing the final application with the
   original proposal?
   - We add a new feature that can show the numbers of different types of crimes in
     given areas. This feature is not included in the original proposal. Also, we
     add the visualization for those data. This feature is not included in the original
     proposal either.
9. Describe future work that you think, other than the interface, that the
   application can improve on
   - The application can improve on the following aspects:
     - The application can provide users with the safest path from one location to
       another.
     - The application can provide users with more information about crimes in Los
       Angeles, e.g. the number of crimes in different areas, the number of crimes
       in different time periods, etc.
10. Describe the final division of labor and how well you managed teamwork.
    - The final division of labor is as follows:
      - Mingjun Liu: Designed the architecture of the application, implemented the
        frontend and backend, and wrote the project report.
      - Shihua Zeng: Implemented the frontend and backend, and wrote the project
        report. Designed the ER diagram and the schema of the database.
      - Xuanbo Jin: Implemented the frontend and backend. Designed the UI of the
        application. Wrote the project report.
    - We managed teamwork well. We communicated with each other frequently and
      helped each other when we encountered problems. We also divided the work
      evenly among team members as much as possible.
