
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const initialNotifications = [
  {
    id: 1,
    title: "Welcome to LightPay",
    message:
      "Welcome to LightPay! Explore your dashboard and discover the tools available to manage your finances.",
    time: "Just now",
    type: "Account",
    read: false,
  },
  {
    id: 2,
    title: "Account security",
    message:
      "Keep your account secure by using a strong password and protecting your login details.",
    time: "1 hour ago",
    type: "Security",
    read: false,
  },
  {
    id: 3,
    title: "Wallet update",
    message:
      "Your wallet section is ready to explore. Visit your dashboard to view the available wallet features.",
    time: "Yesterday",
    type: "Wallet",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  function markAsRead(id) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  function clearAllNotifications() {
    setNotifications([]);
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "850px",
          margin: "40px auto",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
          color: "#172033",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "8px" }}>
              Notifications
            </h1>

            <p style={{ color: "#64748b", margin: 0 }}>
              Stay updated with your LightPay account.
            </p>
          </div>

          <div
            style={{
              background: "#e8efff",
              color: "#1646a0",
              padding: "10px 14px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {unreadCount} unread
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            style={{
              padding: "11px 16px",
              border: "none",
              borderRadius: "6px",
              background: unreadCount === 0 ? "#cbd5e1" : "#1646a0",
              color: "white",
              cursor: unreadCount === 0 ? "not-allowed" : "pointer",
            }}
          >
            Mark all as read
          </button>

          <button
            type="button"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            style={{
              padding: "11px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              background: "white",
              color: "#334155",
              cursor:
                notifications.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Clear all
          </button>
        </div>

        {notifications.length === 0 ? (
          <section
            style={{
              textAlign: "center",
              padding: "60px 20px",
              border: "1px dashed #cbd5e1",
              borderRadius: "12px",
              background: "#f8fafc",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>
              🔔
            </div>

            <h2>No notifications</h2>

            <p style={{ color: "#64748b" }}>
              You are all caught up! There are no notifications to
              display right now.
            </p>

            <Link
              href="/dashboard"
              style={{
                display: "inline-block",
                marginTop: "12px",
                padding: "12px 18px",
                background: "#1646a0",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Back to Dashboard
            </Link>
          </section>
        ) : (
          <section aria-label="Your notifications">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "20px",
                  marginBottom: "14px",
                  border: notification.read
                    ? "1px solid #e2e8f0"
                    : "1px solid #b9cdfa",
                  borderRadius: "10px",
                  background: notification.read
                    ? "white"
                    : "#f1f6ff",
                  alignItems: "flex-start",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "10px",
                    height: "10px",
                    minWidth: "10px",
                    marginTop: "7px",
                    borderRadius: "50%",
                    background: notification.read
                      ? "#cbd5e1"
                      : "#1646a0",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "17px",
                        margin: "0 0 8px",
                      }}
                    >
                      {notification.title}
                    </h2>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                      }}
                    >
                      {notification.time}
                    </span>
                  </div>

                  <p
                    style={{
                      lineHeight: 1.6,
                      color: "#475569",
                      margin: "0 0 12px",
                    }}
                  >
                    {notification.message}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#1646a0",
                        background: "#e8efff",
                        padding: "5px 9px",
                        borderRadius: "12px",
                      }}
                    >
                      {notification.type}
                    </span>

                    {notification.read ? (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        Read
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#1646a0",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
