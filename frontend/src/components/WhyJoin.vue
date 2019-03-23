<template>

    <section class="why-join">

        <div class="cards-container flex justify-center">

            <div class="card">
                <!-- <div class="img-container"> -->
                    <img src="../../public/img/why-join-1.jpeg">
                <!-- </div> -->
                <h1>Community</h1>
                <br>
                <h2>"A great way to experience places from a unique insider perspective, and you'll undoubtedly make great friends along the way. Travel is more about the people you meet than the places you see, people are inherently good."</h2>
                <br>
                <p>- Scott and Rachel (Traveling In Asia)</p>
            </div>


            <div class="card">
                <!-- <div class="img-container"> -->
                    <img src="../../public/img/why-join-2.jpeg">
                <!-- </div> -->
                <h1>Guesting</h1>
                <br>
                <h2>"An opportunity to live very valuable and beautiful experiences. Filled my journey with stories, people, and friends. Given life to the places I visited, and I know that anywhere in the world I visit, I'll possibly have a good friend waiting for me!"</h2>
                <br>
                <p>- Jessica (Traveling in South America)</p>
            </div>


            <div class="card">
                <!-- <div class="img-container"> -->
                    <img src="../../public/img/why-join-3.jpeg">
                <!-- </div> -->
                <h1>Hosting</h1>
                <br>
                <h2>"We wanted to show our children that people from all over the world are good, no matter what culture, skin color, or language. We had no money to travel the world with our four kids, and decided to let the world come to us. A lot of them became friends for life!"</h2>
                <br>
                <p>- Jennifer, Brad, and Kids (Hosting in Amsterdam)</p>
            </div>

        </div>
        
    </section>

</template>

<script>


export default {
  name: 'why-join',
  components: {
    
  }
  
}
</script>

<style lang="scss" scoped>

.why-join{
    // background-image: url('../../public/img/green-back.jpg');
    padding-top: 100px;
    padding-bottom: 100px;
}


.cards-container{
    max-width: 80%;
    margin: 0 auto;
}

.card{
    padding: 20px;
}



img{
    width: 100%;
    height: 250px;
}

h1{
    font-size: 1.5rem;
    text-align: left;
}

h2{
    font-size: 1rem;
    text-align: left;
}

p{
    font-size: 1rem;
    text-align: left;
}


</style>


