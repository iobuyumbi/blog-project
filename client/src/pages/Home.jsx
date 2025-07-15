import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postService } from "../services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await postService.getAllPosts(1, 3);
        setFeaturedPosts(response.posts || []);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to <span className="text-primary">BlogApp</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing stories, share your thoughts, and connect with
          writers from around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/posts">Explore Posts</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/register">Join Our Community</Link>
          </Button>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Posts</h2>
          <Button variant="outline" asChild>
            <Link to="/posts">View All</Link>
          </Button>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card
                key={post._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link
                      to={`/posts/${post.slug || post._id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {formatDate(post.createdAt)} •{" "}
                    {post.author?.name || "Anonymous"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {post.viewCount || 0} views
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/posts/${post.slug || post._id}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No posts available yet. Be the first to create one!
            </p>
            <Button asChild className="mt-4">
              <Link to="/create-post">Create Your First Post</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-primary text-xl">✍️</span>
          </div>
          <h3 className="text-xl font-semibold">Write & Share</h3>
          <p className="text-muted-foreground">
            Create beautiful blog posts and share your stories with the world.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-primary text-xl">💬</span>
          </div>
          <h3 className="text-xl font-semibold">Engage & Connect</h3>
          <p className="text-muted-foreground">
            Comment on posts and connect with other writers in our community.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-primary text-xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold">Grow Together</h3>
          <p className="text-muted-foreground">
            Build your audience and grow your writing skills with our platform.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
