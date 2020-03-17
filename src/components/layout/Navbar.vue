<template>
    <div class="navbar">
        <nav class='nav-extended grey darken-4'>
            <div class="nav-content">
                <router-link :to="{name: 'Home'}">
                    <span class="nav-title grey-text lighten-3">RB-Smoothies</span>
                </router-link>
                <a href="" class='btn-large btn-floating halfway-fab orange darken-2'>
                    <router-link :to="{name: 'AddSmoothie'}">
                        <i class='material-icons'>add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return {

        }
    }
}
</script>

<style>
    .navbar nav{
        padding: 0 30px;
    }
</style>
