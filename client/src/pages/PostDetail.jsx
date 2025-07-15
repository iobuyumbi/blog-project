import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { postService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Skeleton } from "../components/ui/skeleton";
import { toast } from "sonner";

const PostDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPost(id);
      setPost(response.post);
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login to comment");
      return;
    }

    try {
      setSubmittingComment(true);
      await postService.addComment(post._id, { content: commentContent });
      setCommentContent("");
      toast.success("Comment added successfully!");
      fetchPost(); // Refresh to get updated comments
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setDeleting(true);
      await postService.deletePost(post._id);
      toast.success("Post deleted successfully");
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <p className="text-muted-foreground mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </div>
    );
  }

  const canEdit =
    user && (user._id === post.author._id || user.role === "admin");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Post Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
              <AvatarFallback>{getInitials(post.author?.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author?.name || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {canEdit && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to={`/edit-post/${post._id}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeletePost}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold">{post.title}</h1>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {post.category && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          )}
          <span>{post.viewCount || 0} views</span>
          <span>{post.comments?.length || 0} comments</span>
        </div>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground italic">{post.excerpt}</p>
        )}
      </div>

      {/* Featured Image */}
      {post.featuredImage && post.featuredImage !== "default-post.jpg" && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">
          Comments ({post.comments?.length || 0})
        </h3>

        {/* Add Comment Form */}
        {isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle>Add a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddComment} className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                  disabled={submittingComment}
                />
                <Button
                  type="submit"
                  disabled={submittingComment || !commentContent.trim()}
                >
                  {submittingComment ? "Posting..." : "Post Comment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Please{" "}
                <Link to="/login" className="text-primary hover:underline">
                  login
                </Link>{" "}
                to leave a comment.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Card key={comment._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment.user?.avatar}
                        alt={comment.user?.name}
                      />
                      <AvatarFallback>
                        {getInitials(comment.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">
                          {comment.user?.name || "Anonymous"}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
