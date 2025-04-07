"use client";
import * as React from "react";
import "./menu.css";

function Menu() {
  return (
    <nav className={styles.menu} aria-label="Main Navigation">
      <div className={styles.menuContent}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/00f18a4ebc89f86005b96aa736e5029ffaf7be2e?placeholderIfAbsent=true&apiKey=3d8cc3c677d843f3b683e43ca9c35c9d" alt="Company Logo" className={styles.logo} />
        <div
          className={styles.navigationGroup}
          role="group"
          aria-label="Navigation Options"
        >
          <button
            className={styles.navItemActive}
            aria-current="page"
            aria-label="Current Section"
          />
          <button className={styles.navItem} aria-label="Navigation Option 1" />
          <button className={styles.navItem} aria-label="Navigation Option 2" />
          <button className={styles.navItem} aria-label="Navigation Option 3" />
        </div>
      </div>
      <button className={styles.profileButton} aria-label="User Profile" />
    </nav>
  );
}

export default Menu;
