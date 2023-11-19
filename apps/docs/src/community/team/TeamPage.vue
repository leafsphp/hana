<script setup lang="ts">
import { VTLink } from '@leafphp/docs-theme'
import membersCoreData from './members-core.json'
// import membersEmeritiData from './members-emeriti.json'
// import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
</script>

<!-- members data
"website": {
  "label": "evanyou.me",
  "url": "https://evanyou.me"
},
 -->

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>Meet the Team</template>
      <template #lead
        >The development of Leaf and its ecosystem is guided by a our
        <span class="nowrap">core team.</span></template
      >

      <!-- <template #action>
        <VTLink
          href="https://github.com/Leafjs/governance/blob/master/Team-Charter.md"
          >Learn more about teams</VTLink
        >
      </template> -->
    </TeamHero>

    <TeamList :members="membersCoreData">
      <template #title>Core Team Members</template>
      <template #lead
        >Core team members are those who are actively involved in the
        maintenance of one or more core projects. They have made significant
        contributions to the Leaf ecosystem, with a long term commitment to the
        success of the project and its users.</template
      >
    </TeamList>

    <!-- <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Core Team Emeriti</template>
      <template #lead
        >Here we honor some no-longer-active core team members who have made
        valuable contributions in the past.</template
      >
    </TeamList> -->

    <!-- <TeamList :members="membersPartnerData as Member[]">
      <template #title>Community Partners</template>
      <template #lead
        >Some members of the Leaf community have so enriched it, that they
        deserve special mention. We've developed a more intimate relationship
        with these key partners, often coordinating with them on upcoming
        features and news.</template
      >
    </TeamList> -->
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
