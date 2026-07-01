<script setup lang="ts">
interface NavItem {
  to: string;
  label: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { to: "/", label: "首页", icon: "🏠" },
  { to: "/button-a", label: "ButtonA", icon: "📄" },
];
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-icon">⚡</span>
      <span class="brand-text">Vite Learn</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="nav-item--active"
        exact-active-class="nav-item--exact-active"
      >
        <span class="nav-icon" v-if="item.icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <span class="footer-text">后续自行添加按钮</span>
    </div>
  </aside>
</template>
