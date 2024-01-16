In this project, a **Nxt Trendz - Cart Features** was implemented by applying various concepts. Below are the key points for each section:

**Completion Instructions:**
1. **Download dependencies:**
   ```bash
   npm install
   ```

2. **Start the app:**
   ```bash
   npm start
   ```

3. **Functionality to be added:**
   - Unauthenticated users redirected to the **Login** route when accessing the **Cart** route.
   - Implemented features:
     - Feature 1: Update quantity for the same product and maintain cart count.
     - Feature 2: Display total amount and number of items in the **Cart** route.
     - Feature 3: Adjust quantity, update prices, and handle removal of items.
     - Feature 4: Remove a cart item when the remove button is clicked.
     - Feature 5: Remove all cart items when the **Remove All** button is clicked.

4. **`CartContext` properties:**
   - `cartList`: Stores cart items.
   - `removeAllCartItems`: Removes all cart items.
   - `addCartItem`: Adds a cart item.
   - `removeCartItem`: Removes a cart item.
   - `incrementCartItemQuantity`: Increases quantity of a product.
   - `decrementCartItemQuantity`: Decreases quantity of a product.

**Components Structure:**
- Refer to the image at [Nxt Trendz Cart Features Component Structure](https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-cart-features-component-structure-breakdown.png).

**Implementation Files:**
- Utilize the following files for the implementation:
  - `src/App.js`
  - `src/components/Cart/index.js`
  - `src/components/Cart/index.css`
  - `src/components/CartItem/index.js`
  - `src/components/CartItem/index.css`
  - `src/components/CartSummary/index.js`
  - `src/components/CartSummary/index.css`

**Quick Tips:**
- Use the CSS property `line-height: 1.5;` to set the height of a line box.
- Utilize the array method `find()` to retrieve the first item's value that satisfies the provided testing function.

**Important Note:**
- Ensure the use of specific icons from `react-icons` for buttons.
- Follow the structure and attributes specified for components.
- Implement the required functionalities for each feature.
- Use the provided API responses and URLs for fetching data.

Feel free to ask for further clarification on any specific aspect.
