Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{outOfStock: !inStock}">Out Of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <!-- vue if conditionals will actually add / remove this html from the DOM repeatedly when conditions changes -->
                <p v-if="inventory > 10">Tons available!</p>
                <p v-else-if="inventory > 0 && inventory <= 10">Only {{ quantity }} left!</p>
                <p v-else>Check back later!</p>

                <!-- vue show will use the display attribute to hide / show elements on the page -->
                <p v-if="isOnSale">{{ onSaleText }}</p>

                <a v-bind:href="productLink">Click here for the product link</a>

                <div>
                    <div><button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button></div>
                    <div>
                        <button v-on:click="removeFromCart"
                        :disabled="inventory <= 0">Remove from cart</button>
                    </div>
                </div>
            </div>

            <!-- creating a new product component and passing in a value for the component's details property -->
            <productDetails :details="details"></productDetails>

            <div v-for="(variant, index) in variants"
                class="color-box"
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return  {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            productLink: "/product/1",
            inventory: 7,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            sizes: ["small", "medium", "large"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
                    variantQuantity: 7,
                    variantOnSale: false,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantOnSale: true,
                }
            ],
            reviews: [],
        }
    },
    methods: {
        getSelectedVariant() {
            return this.variants[this.selectedVariant];
        },
        addToCart: function() { // uses es5 non-shorthand function declaration
            this.$emit('add-to-cart', this.getSelectedVariant().variantId); // registers an event called add-to-cart for the parent to listen to
        },
        updateProduct(index) { // uses new es6 shorthand function declaration
            this.selectedVariant = index;
        },
        removeFromCart: function() { // uses es5 non-shorthand function declaration
            this.$emit('remove-from-cart', this.getSelectedVariant().variantId); // registers an event called remove-from-cart for the parent to listen to
        },
        isOnSale() {
            return this.getSelectedVariant().variantOnSale;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },
    computed: { // computed properties are cached
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.getSelectedVariant().variantImage;
        },
        inStock() {
            return this.getSelectedVariant().variantQuantity;
        },
        quantity() {
            return this.getSelectedVariant().variantQuantity;
        },
        onSaleText() {
            if(this.getSelectedVariant().variantOnSale) {
                return this.brand + ' ' + this.product + ' is on sale now!';
            } else {
                return 'regular price';
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99;
        }
    }
});

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit"><!-- prevent default behaviour of form submit -->
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="err in errors">{{ err }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name" />
            </p>
            <p>
                <label for="review">Review: </label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating"> <!-- ".number" typecasts the value as a number -->
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>
                <label>Would you recommend this product?</label>
                <div>
                    <label>Select an option</label>
                    <input type="radio" v-model="recommend" value="">
                </div>
                <div>
                    <label>Yes</label>
                    <input type="radio" v-model="recommend" value="1">
                </div>
                <div>
                    <label>No</label>
                    <input type="radio" v-model="recommend" value="0">
                </div>
            </p>
            <p>
                <input type="submit" value="Submit" />
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            // reset the errors array
            this.errors = [];

            if(this.name && this.review && this.rating && this.recommend !== '' && this.recommend !== null){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (!this.recommend) this.errors.push("Recommend required.");
            }
        }
    }
});

// component used to render the product details
Vue.component('productDetails', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
});


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            for(i=0; i<this.cart.length; i++) {
                let productId = this.cart[i];
                if (productId == id) {
                    this.cart.splice(i, 1);
                    return;
                }
            }
        }
    }
});