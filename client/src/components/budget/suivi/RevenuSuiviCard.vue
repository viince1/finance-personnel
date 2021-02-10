<template>
  <div class="container" id="revenuSuivi">
    <a href="">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-5">{{ revenuSuivi.Nom }}</p>
            </div>
          </div>
          <div class="content">
              Montant: {{revenuSuivi.Montant}} $
              <br>
              <div class="level">
                <div class="level-left">
                  <time class="level-item" datetime="2016-1-1">
                    {{revenuSuivi.DateEntree}}
                  </time>
                </div>
              </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'RevenuSuiviCard',
  props: {
    revenuSuivi: Object,
  },
};
</script>
