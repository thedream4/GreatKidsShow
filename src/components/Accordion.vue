<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info"
          >Disclaimer</b-button
        >
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <md-ripple>
          <b-card-body>
            <b-card-text>{{ disclaimer }}</b-card-text>
          </b-card-body>
        </md-ripple>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info"
          >Module details</b-button
        >
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <md-ripple>
          <b-card-body>
            <b-card-text>{{ Programme }}</b-card-text>
            <b-card-text>{{ moduleName }}</b-card-text>
            <b-card-text>{{ moduleCode }}</b-card-text>
            <b-card-text>{{ moduleDetails }}</b-card-text>
          </b-card-body>
        </md-ripple>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info"
          >Coursework details</b-button
        >
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <md-ripple>
          <b-card-body>
            <b-card-text>{{ courseworkIntroduction }}</b-card-text>
            <b-card-text>{{ courseworkDetail }}</b-card-text>
          </b-card-body>
        </md-ripple>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disclaimer: `
        Eventhough each member displayed above has a special "expertise" (i.e. web development, game development, multimedia producer, etc.), our contributions are not limited to that area only. All of us have equally contributed our rightful parts to accomplish this coursework. Each of the cartoons are work done individually. All of us did contribute in areas outside our "expertise".
        `,
      Programme: `BSc (Hons) Multimedia Computing – Level 6 – Core Module`,
      moduleName: `Advanced Multimedia`,
      moduleCode: `6127COMP`,
      moduleDetails: `Assignment 2 of 2 – Group work with peer assessment that covers the design and development of an interactive multimedia application`,
      courseworkIntroduction: `In this assignment, we are required to make use of Twitter Bootstrap, JavaScript, After Effects and Adobe Animate to design and produce an advanced multimedia application. This work is completed as a group (5 students in a group)`,
      courseworkDetail: `We need to produce an entertainment website aimed at children under 6 years old. The application should be built using Twitter Bootstrap using NetBeans IDE with interactive JavaScript elements. The application should contain a cartoon produced in Animate or After Effects (one from each group member). We should then make use of the extensive Effects and Presets options to create an introduction video in After Effects that presents an introduction to the website and the cartoons. A JavaScript-based game should then be created to improve the ‘stickability’ of the website and a report should be produced to detail the group’s work log`,
    };
  },
};
</script>