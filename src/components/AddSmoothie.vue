<template>
    <div class="add-smoothie container">
        <h3 class="center-align ">Add your Smoothie recipe</h3>
        <form @submit.prevent='addSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" v-model='title' name='title'>
            </div>
            <div class='field' v-for='(ing, index) in ingredients' :key="index">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name='ingredient' v-model='ingredients[index]'>
                <i class='delete material-icons orange-text darken-2' @click='deleteIng(ing)'>delete</i>
            </div>
            <div class="field add-ingredients">
                <label for="add-ingredients">Add an Ingredients</label>
                <input type="text" name='add-ingredients' @keydown.tab.prevent='addIng' v-model="another">
            </div>
            <div class="field center-align">
                <p v-if='feedback' class='red-text'>{{feedback}}</p>
                <button class='btn orange darken-2'>Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
   import db from '@/firebase/init'
   import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods:{
        addSmoothie(){
            if(this.title) {
                this.feedback = null
                // create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                title: this.title,
                ingredients: this.ingredients,
                slug: this.slug
                }).then(()=> {
                    this.$router.push({ name: 'Home'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedbak = "You must enter a smoothie title"
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else{
                this.feedback = "You must enter an ingredients"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style scoped>
    .add-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-smoothie h3{
        font-size: 2em;
        margin: 20px auto;
    }
    .add-smoothie .field{
        margin: 20px auto;
        position: relative;
    }

    .add-smoothie .delete {
        position: absolute;
        right: 0px;
        bottom: 16px;
        cursor: pointer;
        font-size: 1.4em;
    }
</style>
