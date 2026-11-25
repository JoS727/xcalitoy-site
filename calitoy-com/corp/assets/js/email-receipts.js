// ============================================================
// STRIPE EMAIL RECEIPTS & ORDER CONFIRMATIONS
// Automated post-purchase emails
// ============================================================

// Email template for order confirmations
const EMAIL_TEMPLATES = {
  orderConfirmation: {
    subject: (order) => `Order Confirmed #${order.id} - ${order.brand}`,
    html: (order) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
    .header { background: ${order.brandColor}; padding: 40px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .content { padding: 40px; }
    .order-id { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .order-date { color: #666; margin-bottom: 30px; }
    .items { margin: 30px 0; }
    .item { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee; }
    .item-name { font-weight: 600; }
    .item-details { color: #666; font-size: 14px; }
    .totals { margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; }
    .total-row { display: flex; justify-content: space-between; margin: 10px 0; }
    .total-row.grand { font-size: 20px; font-weight: bold; margin-top: 20px; }
    .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 14px; }
    .btn { display: inline-block; background: ${order.brandColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${order.brand}</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0;">Order Confirmed</p>
    </div>
    
    <div class="content">
      <p>Hi ${order.customerName},</p>
      <p>Thank you for your order! We're getting it ready for you.</p>
      
      <div class="order-id">Order #${order.id}</div>
      <div class="order-date">${new Date(order.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</div>
      
      <div class="items">
        <h3>Items Ordered</h3>
        ${order.items.map(item => `
          <div class="item">
            <div>
              <div class="item-name">${item.name}</div>
              <div class="item-details">${item.color} / ${item.size} / Qty: ${item.qty}</div>
            </div>
            <div>$${(item.price * item.qty).toFixed(2)}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>$${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>Shipping</span>
          <span>${order.shipping === 0 ? 'FREE' : '$' + order.shipping.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>Tax</span>
          <span>$${order.tax.toFixed(2)}</span>
        </div>
        <div class="total-row grand">
          <span>Total</span>
          <span>$${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div style="margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h3>Shipping Address</h3>
        <p>${order.shippingAddress.name}<br>
        ${order.shippingAddress.line1}<br>
        ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br>
        ${order.shippingAddress.country}</p>
      </div>
      
      <a href="${order.trackingUrl}" class="btn">Track Your Order</a>
    </div>
    
    <div class="footer">
      <p>Questions? Reply to this email or contact us at support@${order.brand.toLowerCase().replace(' ', '')}.com</p>
      <p style="margin-top: 20px;">
        <a href="${order.brandInstagram}">Instagram</a> | 
        <a href="${order.brandWebsite}">Website</a>
      </p>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        © 2026 ${order.brand}. A CalitoyCorp Brand.<br>
        You're receiving this because you made a purchase on our store.
      </p>
    </div>
  </div>
</body>
</html>
    `
  },
  
  shippingConfirmation: {
    subject: (order) => `Your Order #${order.id} Has Shipped!`,
    html: (order) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Shipped</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
    .header { background: ${order.brandColor}; padding: 40px; text-align: center; }
    .header h1 { color: white; margin: 0; }
    .content { padding: 40px; }
    .tracking-box { background: #f0f0f0; padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0; }
    .tracking-number { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
    .btn { display: inline-block; background: ${order.brandColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚚 On Its Way!</h1>
    </div>
    <div class="content">
      <p>Hi ${order.customerName},</p>
      <p>Great news! Your order from ${order.brand} has shipped and is on its way to you.</p>
      
      <div class="tracking-box">
        <p>Tracking Number</p>
        <div class="tracking-number">${order.trackingNumber}</div>
        <p style="color: #666; margin-top: 10px;">${order.carrier}</p>
        <a href="${order.trackingUrl}" class="btn">Track Package</a>
      </div>
      
      <p>Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>
      
      <p style="margin-top: 30px;">Items in this shipment:</p>
      <ul>
        ${order.items.map(item => `<li>${item.name} (${item.color}, ${item.size})</li>`).join('')}
      </ul>
    </div>
  </div>
</body>
</html>
    `
  },
  
  deliveryConfirmation: {
    subject: (order) => `Your Order #${order.id} Has Been Delivered!`,
    html: (order) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Delivered</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
    .header { background: #4ade80; padding: 40px; text-align: center; }
    .header h1 { color: white; margin: 0; }
    .content { padding: 40px; text-align: center; }
    .btn { display: inline-block; background: ${order.brandColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📦 Delivered!</h1>
    </div>
    <div class="content">
      <p>Hi ${order.customerName},</p>
      <p>Your ${order.brand} order has been delivered!</p>
      <p style="font-size: 18px; margin: 30px 0;">We hope you love your new items.</p>
      
      <a href="${order.reviewUrl}" class="btn">Write a Review</a>
      <a href="${order.shopUrl}" class="btn">Shop Again</a>
      
      <p style="margin-top: 40px; color: #666;">Share your look with #${order.brandHashtag}</p>
    </div>
  </div>
</body>
</html>
    `
  }
};

// Send email via backend API
async function sendOrderConfirmation(order) {
  try {
    const response = await fetch('https://api.calitoycorp.com/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: order.customerEmail,
        subject: EMAIL_TEMPLATES.orderConfirmation.subject(order),
        html: EMAIL_TEMPLATES.orderConfirmation.html(order),
        from: `orders@${order.brand.toLowerCase().replace(' ', '')}.com`
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}

// Stripe webhook handler for order events
async function handleStripeWebhook(event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const order = await createOrderFromSession(session);
      await sendOrderConfirmation(order);
      break;
      
    case 'charge.succeeded':
      // Payment confirmed
      break;
      
    case 'invoice.payment_succeeded':
      // Subscription payment (if applicable)
      break;
  }
}

// Create order object from Stripe session
async function createOrderFromSession(session) {
  const lineItems = await getSessionLineItems(session.id);
  
  const brandKey = session.metadata?.brand || 'calitoycorp';
  const brand = BRANDS[brandKey];
  
  const items = lineItems.map(item => ({
    name: item.description,
    price: item.amount_total / 100,
    qty: item.quantity,
    color: item.price_data?.product_data?.metadata?.color || 'Black',
    size: item.price_data?.product_data?.metadata?.size || 'M'
  }));
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const tax = subtotal * 0.0875; // 8.75% tax
  
  return {
    id: session.id.slice(-8).toUpperCase(),
    stripeId: session.id,
    brand: brand.name,
    brandColor: brand.colors.accent,
    brandInstagram: brand.social.instagram,
    brandWebsite: brand.social.website,
    brandHashtag: brand.name.replace(' ', ''),
    customerName: session.customer_details?.name || 'Customer',
    customerEmail: session.customer_details?.email,
    date: new Date().toISOString(),
    items,
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    shippingAddress: {
      name: session.shipping_details?.name,
      line1: session.shipping_details?.address?.line1,
      line2: session.shipping_details?.address?.line2,
      city: session.shipping_details?.address?.city,
      state: session.shipping_details?.address?.state,
      zip: session.shipping_details?.address?.postal_code,
      country: session.shipping_details?.address?.country
    },
    trackingNumber: null,
    trackingUrl: `https://calitoycorp.com/orders/${session.id.slice(-8).toUpperCase()}`,
    reviewUrl: `https://calitoycorp.com/review/${session.id.slice(-8).toUpperCase()}`,
    shopUrl: `https://calitoycorp.com/brands/${brandKey}/`
  };
}

// Get line items from Stripe session
async function getSessionLineItems(sessionId) {
  // In production, this calls Stripe API
  // For now, return mock data
  return [];
}

// Update order with tracking info
async function updateOrderTracking(orderId, trackingNumber, carrier) {
  const order = await getOrder(orderId);
  if (!order) return false;
  
  order.trackingNumber = trackingNumber;
  order.carrier = carrier;
  order.estimatedDelivery = calculateEstimatedDelivery();
  
  await sendShippingConfirmation(order);
  return true;
}

// Send shipping confirmation
async function sendShippingConfirmation(order) {
  return sendOrderConfirmation({
    ...order,
    template: 'shippingConfirmation'
  });
}

// Send delivery confirmation
async function sendDeliveryConfirmation(order) {
  return sendOrderConfirmation({
    ...order,
    template: 'deliveryConfirmation'
  });
}

// Mock order retrieval
async function getOrder(orderId) {
  // In production, fetch from database
  return null;
}

// Calculate estimated delivery
function calculateEstimatedDelivery() {
  const date = new Date();
  date.setDate(date.getDate() + 5); // 5 business days
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Export
window.EMAIL_TEMPLATES = EMAIL_TEMPLATES;
window.sendOrderConfirmation = sendOrderConfirmation;
window.handleStripeWebhook = handleStripeWebhook;
window.updateOrderTracking = updateOrderTracking;
