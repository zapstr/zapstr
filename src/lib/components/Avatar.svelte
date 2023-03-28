<script lang="ts">
    export let userProfile: App.UserProfile;
    export let klass: string | undefined;

    let image: string | undefined;
    let defaultImage = `https://robohash.org/${userProfile.id?.slice(0, 2)}`;

    $: image = userProfile?.image;
</script>

<img src={image||defaultImage} class="w-32 h-32 {klass||''} rounded-full" />