<template>
  <div id="app">
    <Layout />
    <Player />
    <MiniPlayer />
    <Playlist />
    <ShareReader />
  </div>
</template>

<script>
import Layout from "@/layout"
import MiniPlayer from "@/components/mini-player"
import Playlist from "@/components/playlist"
import Player from "@/components/player"
import ShareReader from "@/components/share-reader"

export default {
  metaInfo() {
    return {
      title: "云音乐系统"
    }
  },
  components: { Layout, MiniPlayer, Playlist, Player, ShareReader }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
