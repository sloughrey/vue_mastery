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
                        :disabled="inventory <= 0">Remove from cart</button></div>
                    <div class="cart">Cart({{ cart }})</div>
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
            cart: 0,
        }
    },
    methods: {
        getSelectedVariant() {
            return this.variants[this.selectedVariant];
        },
        addToCart: function() { // uses es5 non-shorthand function declaration
            this.cart += 1; // refers to data.cart
        },
        updateProduct(index) { // uses new es6 shorthand function declaration
            this.selectedVariant = index;
        },
        removeFromCart: function() { // uses es5 non-shorthand function declaration
            this.cart -= 1; // refers to data.cart
        },
        isOnSale() {
            return this.getSelectedVariant().variantOnSale;
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
    }
});